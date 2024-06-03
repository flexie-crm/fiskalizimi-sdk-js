class Fx {
    static ASYNC = "async";
    static SYNC = "sync";
    static B2B = "b2b";
    static B2C = "b2c";
    static AUTO_INVOICE = "auto";
    static EXPORT_INVOICE = "export";
    static CORRECTIVE_INVOICE = "corrective";

    static AUTO_INVOICE_AGREEMENT = "AGREEMENT";
    static AUTO_INVOICE_DOMESTIC = "DOMESTIC";
    static AUTO_INVOICE_ABROAD = "ABROAD";
    static AUTO_INVOICE_SELF = "SELF";
    static AUTO_INVOICE_OTHER = "OTHER";

    static PAYMENT_METHOD_BANK = "ACCOUNT";
    static PAYMENT_METHOD_CASH = "BANKNOTE";
    static PAYMENT_METHOD_CREDIT_CARD = "CARD";
    static PAYMENT_METHOD_CHECK = "CHECK";
    static PAYMENT_METHOD_SVOUCHER = "SVOUCHER";
    static PAYMENT_METHOD_COMPANY = "COMPANY";
    static PAYMENT_METHOD_ORDER = "ORDER";
    static PAYMENT_METHOD_FACTORING = "FACTORING";
    static PAYMENT_METHOD_COMPENSATION = "COMPENSATION";
    static PAYMENT_METHOD_TRANSFER = "TRANSFER";
    static PAYMENT_METHOD_WAIVER = "WAIVER";
    static PAYMENT_METHOD_KIND = "KIND";
    static PAYMENT_METHOD_OTHER = "OTHER";

    static BUSINESS_PROCESS_P1 = "P1";
    static BUSINESS_PROCESS_P2 = "P2";
    static BUSINESS_PROCESS_P6 = "P6";
    static BUSINESS_PROCESS_P10 = "P10";

    static VAT_TYPE_1 = "TYPE_1";
    static VAT_TYPE_2 = "TYPE_2";
    static VAT_MARGIN = "MARGIN_SCHEME";
    static VAT_EXPORT = "EXPORT_OF_GOODS";
}

module.exports = Fx;
