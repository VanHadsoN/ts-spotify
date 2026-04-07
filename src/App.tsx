import './App.css'
import {SearchField} from "@/components/elements/search-field/SearchField.tsx";

function App() {
  return (
      <div>
          <SearchField />
          <div>
              <img src="/banner.png" alt="" className="rounded-xl" />

              <h1 className='text-2xl font-bold mb-1'>Aerosmith</h1>
              <h2 className='text-primary font-semibold'>25.6m Listeners</h2>
          </div>

      </div>
  )
}

export default App
