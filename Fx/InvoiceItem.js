class InvoiceItem {
    constructor() {
        this.itemCode = '';
        this.item = '';
        this.qty = 0.00;
        this.price = 0.00;
        this.qtyUnit = 'Cope';
        this.qtyUnitUblCode = 'XPP';
        this.vatTotal = 0.00;
        this.vatRate = "0.20"; // This should be a string
        this.totalBeforeVat = 0.00;
        this.totalAfterVat = 0.00;
    }

    getItemCode() {
        return this.itemCode;
    }

    setItemCode(itemCode) {
        this.itemCode = itemCode;
    }

    getItem() {
        return this.item;
    }

    setItem(item) {
        this.item = item;
    }

    getQty() {
        return this.qty;
    }

    setQty(qty) {
        this.qty = qty;
    }

    getPrice() {
        return this.price;
    }

    setPrice(price) {
        this.price = price;
    }

    getQtyUnit() {
        return this.qtyUnit;
    }

    setQtyUnit(qtyUnit) {
        this.qtyUnit = qtyUnit;
    }

    getQtyUnitUblCode() {
        return this.qtyUnitUblCode;
    }

    setQtyUnitUblCode(qtyUnitUblCode) {
        this.qtyUnitUblCode = qtyUnitUblCode;
    }

    getVatTotal() {
        return this.vatTotal;
    }

    setVatTotal(vatTotal) {
        this.vatTotal = vatTotal;
    }

    getVatRate() {
        return this.vatRate;
    }

    setVatRate(vatRate) {
        this.vatRate = vatRate;
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

    toJSON() {
        return JSON.stringify(this);
    }

    toArray() {
        return Object.keys(this).reduce((acc, key) => {
            acc[key] = this[key];
            return acc;
        }, {});
    }
}

module.exports = InvoiceItem;
