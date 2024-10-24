import { Provider } from 'react-redux'

import Store from 'app/store'
import AppRouter from 'app/routes'

import { SelectBoxProvider } from 'app/contexts/SelectBox.context'

import 'app/styles/App.css'
import 'app/styles/animations.css'
import 'app/styles/buttons.css'
import 'app/styles/inputs.css'

const App = () => {
  return (
    <Provider store={Store}>
      <SelectBoxProvider>
        <AppRouter />
      </SelectBoxProvider>
    </Provider>
  )
}

export default App