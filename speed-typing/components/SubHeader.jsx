import './SubHeader.css'
import logoLarge from '../typing-speed-test-main/assets/images/logo-large.svg'
import personalBest from '../typing-speed-test-main/assets/images/icon-personal-best.svg'
import { useNavigate } from 'react-router'

export function SubHeader({ personalResults, testIsFinished, setTestIsFinished }) {
    const navigate = useNavigate()
    const handleHomePageNavigate = () => {
        // console.log('bool:', testIsFinished)
        navigate('/')
    }

    return (
        <div className="header-type">
            <div className='logo-container' onClick={handleHomePageNavigate}>
                <img src={logoLarge} alt="logo large" className="logo-large" />
            </div>
            <div className='personal-best'>
                {personalResults === null
                    ? <p> <img src={personalBest} alt="" /><span style={{ color: 'rgb(148, 148, 151)' }}>Personal best:</span> Nothing!</p>
                    : <p> <img src={personalBest} alt="" /><span style={{ color: 'rgb(148, 148, 151)' }}>Personal best:</span> PB  WPM</p>
                }
            </div>
        </div>
    )
}