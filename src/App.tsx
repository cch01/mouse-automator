import { Bounce, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { MainContainer } from 'containers/MainContainer'
import { Contexts } from 'contexts';

const queryClient = new QueryClient()

function App() {

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Contexts>
          <MainContainer />
        </Contexts>
      </QueryClientProvider>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
        toastStyle={{ margin: '12px 24px 24px' }}
        toastClassName='bg-bg-alternative rounded-md border-b-0'
        bodyClassName='font-semibold'
      />
    </>
  )
}

export default App
