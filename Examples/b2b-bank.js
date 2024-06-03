const path = require('path');
const classesDir = path.join(__dirname, '../Fx');

const Fx = require(path.join(classesDir, 'Fx'));
const InvoiceItem = require(path.join(classesDir, 'InvoiceItem'));
const Endpoint = require(path.join(classesDir, 'Endpoint'));
const Fiskalizimi = require(path.join(classesDir, 'Fiskalizimi'));
const Invoice = require(path.join(classesDir, 'Invoice'));
const QtyUnitUBL = require(path.join(classesDir, 'QtyUnitUBL'));

const start = Date.now();

const invoice = new Invoice();

// Invoice Details
invoice.setInvoiceType(Fx.B2B);
invoice.setBusinessProcess(Fx.BUSINESS_PROCESS_P1);
invoice.setPaymentMethod(Fx.PAYMENT_METHOD_BANK);
invoice.setCurrency("EUR");
invoice.setCurrencyRate(100.11);
invoice.setVatTotal(40);
invoice.setTotalBeforeVat(200);
invoice.setTotalAfterVat(240);

// Customer Details
invoice.setClientName("John Doe");
invoice.setClientNuis("L42202006O");
invoice.setClientAddress("ZIP ... 12345");
invoice.setClientCity("Tirane");
invoice.setClientCountryCode("ALB");

// Bank Details
invoice.setBankName("Some Random Bank");
invoice.setBankSwift("ALBBALS");
invoice.setBankIban("AL00010001111111111111111111");

const createInvoiceItem = (qty, price, totalBeforeVat, vatTotal, totalAfterVat) => {
    const item = new InvoiceItem();
    const productCode = uniqid()

    item.setItemCode(productCode);
    item.setItem(`Product - ${productCode}`);
    item.setQty(qty);
    item.setPrice(price);
    item.setQtyUnit("Cope");
    item.setQtyUnitUblCode("XPP");
    item.setVatRate("0.20");
    item.setTotalBeforeVat(totalBeforeVat);
    item.setTotalAfterVat(totalAfterVat);
    item.setVatTotal(vatTotal);

    return item;
};

invoice.setItems(createInvoiceItem(1, 100, 100, 20, 120));
invoice.setItems(createInvoiceItem(1, 100, 100, 20, 120));

// Initialize main fiskalizimi object with your Flexie CRM KEY
const fiskalizimi = new Fiskalizimi("Tw8Yewd1U0d4hViNzGrbLliRlteKTMBT");

(async () => {
    try {
        // Send it to Flexie CRM to finalize the Fiskalizimi process
        const invoiceData = await fiskalizimi.newInvoice(invoice, 'sync');
        console.log(invoiceData.toArray());
    } catch (e) {
        console.error(e.message);
    }

    const timeElapsedSecs = (Date.now() - start) / 1000;
    console.log(`Fiskalizimi in ${timeElapsedSecs} seconds`);
})();

function uniqid() {
    return 'id-' + Math.random().toString(36).substr(2, 16);
}
