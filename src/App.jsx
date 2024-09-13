import './App.css'
import CountdownTimer from './component/CountdownTimer'
import TimeDetails from './component/TimeDetails'
import TimeForm from './component/TimeForm'


function App() {
  return (
    <div className='min-vh-100 css-selector overflow-x-hidden'>
      <div className="centered-box">
        <div className="box-content" >
          <TimeForm />
        </div>
        <div className="box-content" >
          <TimeDetails />
        </div>
      </div>
      <div className=''>
        <CountdownTimer /> 
      </div>
    </div>
  )
}

export default App
