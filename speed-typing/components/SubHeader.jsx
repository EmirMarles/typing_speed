import './SubHeader.css'
import logoLarge from '../typing-speed-test-main/assets/images/logo-large.svg'
import personalBest from '../typing-speed-test-main/assets/images/icon-personal-best.svg'

export function SubHeader({ personalResults }) {
    return (
        <div className="header-type">
            <div className='logo-container'>
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