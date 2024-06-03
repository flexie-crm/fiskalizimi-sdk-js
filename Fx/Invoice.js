const InvoiceItem = require('./InvoiceItem');
const Fx = require('./Fx');

class Invoice {
    constructor() {
        this.invoiceNumber = "";
        this.dateTimeIssued = "";
        this.operatorCode = "";
        this.tcrCode = "";
        this.clientName = "";
        this.clientNuis = "";
        this.clientId = "";
        this.clientAddress = "";
        this.clientCity = "";
        this.clientCountryCode = "";
        this.invoiceType = "";
        this.autoInvoiceType = "";
        this.dueDate = 0;
        this.periodStart = "";
        this.periodEnd = "";
        this.paymentMethod = "";
        this.paymentType = "";
        this.businessProcess = "";
        this.bankName = "";
        this.bankIban = "";
        this.bankSwift = "";
        this.currency = "ALL";
        this.currencyRate = 1.00;
        this.vatTotal = 0.00;
        this.totalBeforeVat = 0.00;
        this.totalAfterVat = 0.00;
        this.referenceInvoiceNslf = "";
        this.referenceInvoiceDateTimeIssued = "";
        this.referenceInvoiceType = "";
        this.items = [];
        this.webhookCallback = "";
        this.sendToEmail = "";
        this.flexieWorkflowAdditionalData = [];
        this.errors = [];
    }

    getOperatorCode() {
        return this.operatorCode;
    }

    overrideOperatorCode(operatorCode) {
        this.operatorCode = operatorCode;
    }

    getTcrCode() {
        return this.tcrCode;
    }

    overrideTcrCode(tcrCode) {
        this.tcrCode = tcrCode;
    }

    getInvoiceNumber() {
        return this.invoiceNumber;
    }

    overrideInvoiceNumber(invoiceNumber) {
        this.invoiceNumber = invoiceNumber;
    }

    getDateTimeIssued() {
        return this.dateTimeIssued;
    }

    overrideDateTimeIssued(dateTimeIssued) {
        this.dateTimeIssued = dateTimeIssued;
    }

    getClientName() {
        return this.clientName;
    }

    setClientName(clientName) {
        this.clientName = clientName;
    }

    getClientNuis() {
        return this.clientNuis;
    }

    setClientNuis(clientNuis) {
        this.clientNuis = clientNuis;
    }

    getClientId() {
        return this.clientId;
    }

    setClientId(clientId) {
        this.clientId = clientId;
    }

    getClientAddress() {
        return this.clientAddress;
    }

    setClientAddress(clientAddress) {
        this.clientAddress = clientAddress;
    }

    getClientCity() {
        return this.clientCity;
    }

    setClientCity(clientCity) {
        this.clientCity = clientCity;
    }

    getClientCountryCode() {
        return this.clientCountryCode;
    }

    setClientCountryCode(clientCountryCode) {
        this.clientCountryCode = clientCountryCode;
    }

    getInvoiceType() {
        return this.invoiceType;
    }

    setInvoiceType(invoiceType) {
        this.invoiceType = invoiceType;
    }

    getAutoInvoiceType() {
        return this.autoInvoiceType;
    }

    setAutoInvoiceType(autoInvoiceType) {
        this.autoInvoiceType = autoInvoiceType;
    }

    getDueDate() {
        return this.dueDate;
    }

    setDueDate(dueDate) {
        this.dueDate = dueDate;
    }

    getPeriodStart() {
        return this.periodStart;
    }

    setPeriodStart(periodStart) {
        this.periodStart = periodStart;
    }

    getPeriodEnd() {
        return this.periodEnd;
    }

    setPeriodEnd(periodEnd) {
        this.periodEnd = periodEnd;
    }

    getPaymentMethod() {
        return this.paymentMethod;
    }

    setPaymentMethod(paymentMethod) {
        this.paymentMethod = paymentMethod;

        switch (paymentMethod) {
            case Fx.PAYMENT_METHOD_CASH:
            case Fx.PAYMENT_METHOD_CREDIT_CARD:
            case Fx.PAYMENT_METHOD_CHECK:
            case Fx.PAYMENT_METHOD_SVOUCHER:
            case Fx.PAYMENT_METHOD_COMPANY:
            case Fx.PAYMENT_METHOD_ORDER:
                this.setPaymentType("CASH");
                break;
            case Fx.PAYMENT_METHOD_BANK:
            case Fx.PAYMENT_METHOD_FACTORING:
            case Fx.PAYMENT_METHOD_COMPENSATION:
            case Fx.PAYMENT_METHOD_TRANSFER:
            case Fx.PAYMENT_METHOD_WAIVER:
            case Fx.PAYMENT_METHOD_KIND:
            case Fx.PAYMENT_METHOD_OTHER:
                this.setPaymentType("NONCASH");
                break;
        }
    }

    getBusinessProcess() {
        return this.businessProcess;
    }

    setBusinessProcess(businessProcess) {
        this.businessProcess = businessProcess;
    }

    getBankName() {
        return this.bankName;
    }

    setBankName(bankName) {
        this.bankName = bankName;
    }

    getBankIban() {
        return this.bankIban;
    }

    setBankIban(bankIban) {
        this.bankIban = bankIban;
    }

    getBankSwift() {
        return this.bankSwift;
    }

    setBankSwift(bankSwift) {
        this.bankSwift = bankSwift;
    }

    getCurrency() {
        return this.currency;
    }

    setCurrency(currency) {
        this.currency = currency;
    }

    getCurrencyRate() {
        return this.currencyRate;
    }

    setCurrencyRate(currencyRate) {
        this.currencyRate = currencyRate;
    }

    getVatTotal() {
        return this.vatTotal;
    }

    setVatTotal(vatTotal) {
        this.vatTotal = vatTotal;
    }

    getTotalBeforeVat() {
        return this.totalBeforeVat;
    }

    setTotalBeforeVat(totalBeforeVat) {
        this.totalBeforeVat = totalBeforeVat;
    }

    getTotalAfterVat() {
        return this.totalAfterVat;
    }

    setTotalAfterVat(totalAfterVat) {
        this.totalAfterVat = totalAfterVat;
    }

    getItems() {
        return this.items;
    }

    setItems(item) {
        this.items.push(item);
    }

    getWebhookCallback() {
        return this.webhookCallback;
    }

    setWebhookCallback(webhookCallback) {
        this.webhookCallback = webhookCallback;
    }

    getSendToEmail() {
        return this.sendToEmail;
    }

    setSendToEmail(sendToEmail) {
        this.sendToEmail = sendToEmail;
    }

    enrichInvoiceProperties(name, value) {
        this[name] = value;
    }

    getPaymentType() {
        return this.paymentType;
    }

    setPaymentType(paymentType) {
        this.paymentType = paymentType;
    }

    getReferenceInvoiceNslf() {
        return this.referenceInvoiceNslf;
    }

    setReferenceInvoiceNslf(referenceInvoiceNslf) {
        this.referenceInvoiceNslf = referenceInvoiceNslf;
    }

    getReferenceInvoiceDateTimeIssued() {
        return this.referenceInvoiceDateTimeIssued;
    }

    setReferenceInvoiceDateTimeIssued(referenceInvoiceDateTimeIssued) {
        this.referenceInvoiceDateTimeIssued = referenceInvoiceDateTimeIssued;
    }

    getReferenceInvoiceType() {
        return this.referenceInvoiceType;
    }

    setReferenceInvoiceType(referenceInvoiceType) {
        this.referenceInvoiceType = referenceInvoiceType;
    }

    getErrors() {
        return this.errors;
    }

    setErrors(error) {
        this.errors.push(error);
    }

    getFlexieWorkflowAdditionalData() {
        return this.flexieWorkflowAdditionalData;
    }

    setFlexieWorkflowAdditionalData(flexieWorkflowAdditionalData) {
        this.flexieWorkflowAdditionalData = flexieWorkflowAdditionalData;
    }

    toJSON() {
        const invoiceArray = { ...this };
        return JSON.stringify(
            Object.fromEntries(
                Object.entries(invoiceArray).map(([key, value]) => {
                    if (Array.isArray(value) && value.length > 0 && value[0] instanceof InvoiceItem) {
                        return [key, value.map(item => item.toArray())];
                    }
                    return [key, value];
                }).filter(([_, value]) => value !== undefined && value !== null && value !== "")
            )
        );
    }

    toArray() {
        const invoiceArray = { ...this };
        return Object.fromEntries(
            Object.entries(invoiceArray).map(([key, value]) => {
                if (Array.isArray(value) && value.length > 0 && value[0] instanceof InvoiceItem) {
                    return [key, value.map(item => item.toArray())];
                }
                return [key, value];
            }).filter(([_, value]) => value !== undefined && value !== null && value !== "" || value === 0)
        );
    }
}


module.exports = Invoice;
