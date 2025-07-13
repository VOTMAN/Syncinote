// import * as fs from 'node:fs'
import { createFileRoute, useRouter, Link } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'

// const filePath = 'count.txt'

// async function readCount() {
//   return parseInt(
//     await fs.promises.readFile(filePath, 'utf-8').catch(() => '0')
//   )
// }

// const getCount = createServerFn({
//   method: 'GET',
// }).handler(() => {
//   return readCount()
// })

// const updateCount = createServerFn({ method: 'POST' })
//   .validator((d: number) => d)
//   .handler(async ({data}) => {
//     const count = await readCount();
//     await fs.promises.writeFile(filePath, `${count + data}`)
//   })

export const Route = createFileRoute('/')({
  component: Home,
  // loader: async () => await getCount(),
})

function Home() {
  // const router = useRouter();
  // const state = Route.useLoaderData()

  return (
    <div className='flex flex-col min-h-screen'>
      <div className='text-center mt-auto'>
        <h1 className='text-center text-3xl mb-5 font-bold'>SynciNote</h1>
        <p>A local first light weight note taking app with markdown support and syncs to your google drive to save data (if opted)</p>
      </div>
      <Link
      to='/notes'
      className="text-center self-center mt-auto mb-auto p-2 cursor-pointer bg-amber-400 hover:bg-amber-500 text-slate-900 transition w-30 h-10 shadow rounded"
      >
        Click to Enter
      </Link>

    </div>
  )
}
