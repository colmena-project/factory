import Head from 'next/head';
import Header from '../components/common/Header';
import StateBadge from '../components/table/StateBadge';
import Card from '../components/general/Card';
import { data, cards } from '../data/dummy';

const Home = () => {

  return (
    <div className="">
      <Head>
        <title>Colmena Factory</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="grid grid-cols-4">
        <div className="col-span-3" style={{ paddingRight: 20 }}>
          <div className="m-2" style={{ padding: 10 }}>
            <input type="checkbox" />
            <span style={{ paddingLeft: 10 }}>Ver sólo pendientes</span>
          </div>
          <table className="table-fixed m-2" style={{ width: '100%', maxWidth: '100%' }}>
            <thead style={{ backgroundColor: '#eeeeee' }}>
              <tr>
                <td className="w-2/12 p-2">Pedido</td>
                <td className="w-2/12 p-2">Usuario</td>
                <td className="w-2/12 p-2">Transacción / producto</td>
                <td className="w-3/12 p-2">Estado</td>
                <td className="w-2/12 p-3">Total</td>
                <td className="w-1/12 p-3 text-center">Acciones</td>
              </tr>
            </thead>
            <tbody>
              {data && data.map(row => (
                <tr style={{ borderTopWidth: 1, borderTopColor: '#eeeeee' }}>
                  <td className="p-2">
                    <p>{row.date}</p>
                    {row.address}
                  </td>
                  <td className="p-2">
                    <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
                      <img style={{ paddingRight: 10 }} className="" src="/img/profile_x1.png" />
                      <div>
                        <p>{row.username}</p>
                        {row.id}
                      </div>
                    </div>
                  </td>
                  <td className="p-2">
                    <p style={{ fontWeight: 'bold' }}>#{row.transactionId}</p>
                    {row.wasteTypes}
                  </td>
                  <td className="p-2">
                    <StateBadge state={row.state} percent={row.percent} />
                  </td>
                  <td className="p-2">
                    <p>{row.total1}</p>
                    {row.total2}
                  </td>
                  <td className="p-2">
                    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                      <img style={{ width: 30, height: 30, cursor: 'pointer' }} src="/icons/edit.png" alt="" />
                      <img style={{ width: 30, height: 30, cursor: 'pointer' }} src="/icons/cancel.png" alt="" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 60 }}>
          {cards && cards.map(cardInfo => (
            <Card data={cardInfo} />
          ))}
        </div>

      </div>

    </div>
  );
};

export default Home;