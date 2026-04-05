import { UserProvider } from './context/UserContext';
import AppRoutes from './routes/Routes';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';//Bootstrap JavaScript library

function App() {

  return (
    <UserProvider>
      <div>
        <AppRoutes />
      </div>
    </UserProvider>

  );
}
export default App;
