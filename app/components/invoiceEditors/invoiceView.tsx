import moment from "moment"
import { details } from "../../details"
import Icon from "../../gslicon"
import { InvoiceViewProps } from "../../types"

export default function InvoiceView({
  invoiceData, setInvoiceData, invoiceRef
}: InvoiceViewProps) {
  return <div className="flex items-center justify-center w-full h-full [&>h2,span]:leading-[14.52px]">
    <div className="bg-white border-t-[10px] pb-[40px] pt-[20px] px-[30px] border-t-cyan-700 min-h-[796px] w-[570px] flex flex-col justify-between" ref={invoiceRef && invoiceRef}>
      <div className="flex flex-col">
        <div className="flex justify-between h-10 gap-4">
          <h1 className="text-xl font-medium">Invoice</h1>
          <Icon width={40} height={40} viewbox="0 0 40 40" className="w-10 h-10" />
        </div>
        <div className="grid grid-cols-2 gap-[5px] mt-[9px] mb-[36px] w-max ">
          <h2 className="text-xs font-medium ">Invoice number</h2>
          <span className="text-xs font-normal">{invoiceData.invoiceId}</span>
          <h2 className="text-xs font-medium">Invoice date</h2>
          <span className="text-xs font-normal">{invoiceData.invoiceDate && invoiceData.invoiceDate.toDateString()}</span>
          <h2 className="text-xs font-medium">Due date</h2>
          <span className="text-xs font-normal">{invoiceData.dueDate && invoiceData.dueDate.toDateString()}</span>
        </div>
        <div className="flex mb-16 gap-28">
          <div className="flex flex-col gap-[5px]">
            <h1 className="text-xs font-medium">
              {details.company.name}
            </h1>
            <span className="text-xs font-light">
              {details.company.email}
            </span>
          </div>
          {invoiceData.customer &&
            <div className="flex flex-col gap-[5px]">
              <h1 className="text-xs font-medium">
                Bill to
              </h1>
              <span className="text-xs font-light">
                {invoiceData.customer.name}
              </span>
              <span className="text-xs font-light">
                {invoiceData.customer.email}
              </span>
            </div>
          }
        </div>
        <div className="mb-10">
          <h1 className="text-lg font-medium mb-[9px]">{details.currency.prefix}{
            invoiceData.items?.reduce((acc, item) => acc + item.totalPrice, 0) + invoiceData.vat
          } {details.currency.suffix} due {moment(invoiceData.dueDate).format("MMMM D, YYYY")}</h1>
          <div className="flex flex-row items-start w-full text-xs font-light" >
            <textarea className="w-full placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Memo"
              rows={1}
              value={invoiceData.memo}
              onChange={(e) => {
                setInvoiceData({ ...invoiceData, memo: e.target.value })
              }}>
            </textarea>
          </div>
        </div>
        <div className="flex flex-col items-end gap-7">
          <table className="w-full">
            <thead className="border-b-2">
              <tr className="[&>*]:text-[8px] [&>*]:font-light [&>*]:pb-2">
                <th className="text-left">Description</th>
                <th className="text-right">Qty</th>
                <th className="text-right">Unit Price</th>
                <th className="text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.items?.map((item, index) => (
                <tr key={index} className={"[&>td]:text-[10px] [&>td]:font-light " + (index === 0 && "[&>td]:pt-[6px]")}>
                  <td>{item.name}</td>
                  <td className="text-right">{item.quantity}</td>
                  <td className="text-right">{details.currency.prefix}{item.price} {details.currency.suffix}</td>
                  <td className="text-right">{details.currency.prefix}{item.totalPrice} {details.currency.suffix}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <table className="w-60">
            <tbody>
              <tr className="[&>*]:text-[10px] [&>*]:font-light [&>td]:border-t-2 [&>td]:py-1">
                <td className="text-left">Subtotal</td>
                <td className="text-right">{details.currency.prefix}{
                  invoiceData.items?.reduce((acc, item) => acc + item.totalPrice, 0).toPrecision(invoiceData.items?.reduce((acc, item) => acc + item.totalPrice, 0).toString().split(".")[0]?.length + 2 || 2)
                } {details.currency.suffix}</td>
              </tr>
              <tr className="[&>*]:text-[10px] [&>*]:font-light [&>td]:border-t-2 [&>td]:py-1">
                <td className="text-left">VAT</td>
                <td className="text-right">{details.currency.prefix}{invoiceData.vat ?
                  invoiceData.vat.toPrecision(invoiceData.vat.toString().split(".")[0]?.length + 2 || 2) :
                  0
                } {details.currency.suffix}</td>
              </tr>
              <tr className="[&>*]:text-[10px] [&>*]:font-light [&>td]:border-t-2 [&>td]:py-1">
                <td className="text-left">Total</td>
                <td className="text-right">{details.currency.prefix}{
                  (invoiceData.items?.reduce((acc, item) => acc + item.totalPrice, 0) + invoiceData.vat).toPrecision((invoiceData.items?.reduce((acc, item) => acc + item.totalPrice, 0) + invoiceData.vat).toString().split(".")[0]?.length + 2 || 2)
                } {details.currency.suffix}</td>
              </tr>
              <tr className="[&>*]:text-[10px] [&>*]:font-medium [&>td]:border-t-2 [&>td]:py-1">
                <td className="text-left">Amount due</td>
                <td className="text-right">{details.currency.prefix}{
                  (invoiceData.items?.reduce((acc, item) => acc + item.totalPrice, 0) + invoiceData.vat).toPrecision((invoiceData.items?.reduce((acc, item) => acc + item.totalPrice, 0) + invoiceData.vat).toString().split(".")[0]?.length + 2 || 2)
                } {details.currency.suffix}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <footer className="flex flex-col text-xs font-light gap-9">
        <textarea className="pb-[10px] text-[10px] border-b-2 w-full placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50" value={
          invoiceData.footer
        }
          onChange={(e) => {
            setInvoiceData({ ...invoiceData, footer: e.target.value })
          }}
          placeholder="Footer"
          rows={3}
        ></textarea>
        <span className="text-[8px] font-light">
          {invoiceData.invoiceId} -  {details.currency.prefix}{
            invoiceData.items?.reduce((acc, item) => acc + item.totalPrice, 0) + invoiceData.vat
          } {details.currency.suffix} due {moment(invoiceData.dueDate).format("MMMM D, YYYY")}
        </span>
      </footer>
    </div>
  </div>
}