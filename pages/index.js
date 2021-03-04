import Head from 'next/head'

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>Colmena Factory</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{ backgroundColor: '#14B8A6' }}>
        <div className="mx-auto py-3 px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between flex-wrap">
            <div className="flex items-center">
              <img className="" src="/img/logo.png" />
            </div>
            <div className="flex items-center">
              <img className="" src="/img/search.png" />
              <p className="ml-3 font-medium text-white truncate">
                buscar transacciones, cod de prod, usuario
              </p>
            </div>
            <div className="flex items-center">
              <button type="button" className="-mr-1 flex p-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2">
                <img className="" src="/img/user-group.png" />
              </button>
              <button type="button" className="-mr-1 flex p-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2">
                <img className="" src="/img/user.png" />
              </button>
              <button type="button" className="-mr-1 flex p-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2">
                <img className="" src="/img/profile_x1.png" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


