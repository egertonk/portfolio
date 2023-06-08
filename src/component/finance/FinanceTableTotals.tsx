//todo Remove any
export const FinanceTableTotals: React.FC<any> = ({ total }) => {
  return (
    <tr key="total" className="p-2 bg-resume-box text-white">
      <td className="pl-2 text-left border border-slate-300 ...">Total</td>
      <td className="pl-2 text-right border border-slate-300 ...">${total}</td>
      <td className="pl-2 text-left border border-slate-300 ..." />
    </tr>
  );
};
