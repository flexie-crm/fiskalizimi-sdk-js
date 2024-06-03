const axios = require('axios');
const jwt = require('jsonwebtoken');
const { DateTime } = require('luxon');
const Endpoint = require('./Endpoint');
const Invoice = require('./Invoice');

class Fiskalizimi {
    constructor(key) {
        this.key = key;
        this.timeout = 0;
        this.connectTimeout = 0;
        this.readTimeout = 60;
        this.invoice = null;
    }

    async newInvoice(invoice, method = 'sync') {
        this.invoice = invoice;
        await this.newInvoiceToFlexie(method);
        return this.invoice;
    }

    async newInvoiceToFlexie(method = 'sync') {
        if (!(this.invoice instanceof Invoice)) {
            throw new Error('Invoice object not initialized. Create Invoice object first, then send to Flexie');
        }

        try {
            const res = await this.sendPayload(method === 'sync' ? Endpoint.FX_NEW_INVOICE : Endpoint.FX_NEW_INVOICE_ASYNC, this.invoice.toArray());
            if (res.status === 200) {
                const result = res.data;
                if (!result.ok) {
                    throw new Error(`There was an error at Fiskalizimi. Error Code ${result.fz_error_code}. Error Message ${result.fz_error_message}`);
                }
                Object.keys(result).forEach(key => {
                    this.invoice.enrichInvoiceProperties(key, result[key]);
                });
            } else {
                throw new Error(`There was an error on HTTP request, failed with code ${res.status}. ${res.data}`);
            }
        } catch (ex) {
            throw new Error(ex.message);
        }
    }

    async validateNuis(nuis) {
        const nuisPattern = /^[a-zA-Z](.[0-9]{1,8}[a-zA-Z])?$/;
        if (!nuisPattern.test(nuis)) {
            throw new Error('NUIS does not match pattern of starting and ending with a letter, and being 10 characters in length.');
        }

        try {
            const res = await this.sendPayload(Endpoint.FX_VERIFY_NUIS, { nuis });
            if (res.status === 200) {
                return res.data.found ?? false;
            }
            return false;
        } catch (ex) {
            throw new Error(ex);
        }
    }

    async getCurrencyRate() {
        const client = axios.create();
        const res = await client.get(Endpoint.FX_GET_CURRENCY_RATE);
        if (res.status === 200) {
            return res.data;
        }
        return [];
    }

    async getEInvoiceCode(nivf) {
        if (!nivf) {
            throw new Error('Please provide a valid NIVF code in order to retrieve EIC');
        }

        try {
            const res = await this.sendPayload(Endpoint.FX_GET_EIC, { nivf });
            if (res.status === 200) {
                return res.data.eic ?? '';
            }
            return '';
        } catch (ex) {
            throw new Error(ex);
        }
    }

    async tcrOperation(type, amount, overrideTcrCode = null, overrideChangeDateTime = null, method = 'sync') {
        if (!['INITIAL', 'WITHDRAW', 'DEPOSIT'].includes(type)) {
            throw new Error('Bad TCR Operation, it should be either one of the following: INITIAL, WITHDRAW or DEPOSIT');
        }

        const tcr = { operation: type, amount };

        if (overrideTcrCode) tcr.overrideTcrCode = overrideTcrCode;
        if (overrideChangeDateTime) tcr.overrideChangeDateTime = overrideChangeDateTime;

        try {
            const res = await this.sendPayload(method === 'sync' ? Endpoint.FX_TCR_OPERATION : Endpoint.FX_TCR_OPERATION_ASYNC, tcr);
            if (res.status === 200) {
                const result = res.data;
                if (!result.ok) {
                    throw new Error(`There was an error at TCR Operation. Error Code ${result.fz_error_code}. Error Message ${result.fz_error_message}`);
                }
                return result.fcdc ?? '';
            }
            throw new Error(`There was an error at TCR Operation. Error Code ${res.status}`);
        } catch (ex) {
            throw new Error(ex.message);
        }
    }

    async addTcr(tcrIdentifier, validFrom, validTo = null) {
        if (!tcrIdentifier) {
            throw new Error('Please provide an alpha-numeric identifier for this TCR, as it would be needed later on, in case you edit it.');
        }

        const tcr = { tcrIdentifier, validFrom: validFrom.toISODate() };

        if (validTo) tcr.validTo = validTo.toISODate();

        try {
            const res = await this.sendPayload(Endpoint.FX_NEW_TCR, tcr);
            if (res.status === 200) {
                const result = res.data;
                if (!result.ok) {
                    throw new Error(`There was an error at New TCR. Error Code ${result.fz_error_code}. Error Message ${result.fz_error_message}`);
                }
                return result.tcrCode ?? '';
            } else {
                throw new Error(`Error on getting new TCRCode from Flexie Service. Error Code ${res.status}. Error Message ${res.data}`);
            }
        } catch (ex) {
            throw new Error(ex.message);
        }
    }

    async editTcr(tcrIdentifier, validTo) {
        if (!tcrIdentifier) {
            throw new Error('Please provide a valid TCR Identifier you want to edit');
        }

        try {
            const res = await this.sendPayload(Endpoint.FX_EDIT_TCR, { tcrIdentifier, validTo: validTo.toISODate() });
            if (res.status === 200) {
                const result = res.data;
                if (!result.ok) {
                    throw new Error(`There was an error on editing TCR. Error Code ${result.fz_error_code}. Error Message ${result.fz_error_message}`);
                }
                return true;
            }
            return false;
        } catch (ex) {
            throw new Error(ex.message);
        }
    }

    async subscriptionParametersValidity(parametersToValidate) {
        if (!parametersToValidate.length) {
            throw new Error('There are no parameters to validate, please add parameters in order to send at Flexie for validation.');
        }

        try {
            const res = await this.sendPayload(Endpoint.FX_PARAMETER_VALIDATION, parametersToValidate);
            if (res.status === 200) {
                const result = res.data;
                if (!result.ok) {
                    throw new Error('There was an error at parameters validation endpoint');
                }
                return result;
            } else {
                throw new Error(`Error on validating parameters at Flexie Service. Error Code ${res.status}. Error Message ${res.data}`);
            }
        } catch (ex) {
            throw new Error(ex.message);
        }
    }

    async sendPayload(endpoint, payload) {
        const tokenIssuedDate = DateTime.now();
        const tokenExpireDate = tokenIssuedDate.plus({ hours: 1 });

        const token = jwt.sign({
            iss: endpoint.key,
            iat: tokenIssuedDate.toSeconds(),
            exp: tokenExpireDate.toSeconds(),
        }, endpoint.secret);

        const client = axios.create({
            baseURL: endpoint.url,
            timeout: this.timeout * 1000,
            headers: {
                'Content-Type': 'application/json',
                'token': token,
                'key': this.key,
            },
        });

        try {
            const response = await client.post('', payload);
            const responseDecoded = response.data;
            if (responseDecoded.active === false) {
                throw new Error(`Client with KEY ${this.key} it's not active, please contact support@flexie.io`);
            }
            return response;
        } catch (ex) {
            throw new Error(ex.message);
        }
    }
}

module.exports = Fiskalizimi;
