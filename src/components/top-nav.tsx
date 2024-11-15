import { Info, Mic, Moon, Settings, Sun, Volume2 } from 'lucide-react'
import type { FC } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../config/use-theme'
import { testid } from '../constant'
import { Button } from '../primitives/button'

export const TopNav: FC = () => {
	const [theme, setTheme] = useTheme()

	const handleThemeToggle = () => {
		setTheme(theme === 'light' ? 'dark' : 'light')
	}

	return (
		<nav className='mb-8 flex flex-wrap-reverse justify-between gap-4'>
			<div className='flex justify-between gap-2'>
				<Link to='/' data-testid={testid.gotoOutputDevices}>
					<Button variant='outline' size='sm'>
						<Volume2 />
					</Button>
				</Link>
				<Link to='/input' data-testid={testid.gotoInputDevices}>
					<Button variant='outline' size='sm'>
						<Mic />
					</Button>
				</Link>
			</div>

			<div className='flex justify-between gap-2'>
				<Link to='/about' data-testid={testid.gotoAbout}>
					<Button variant='outline' size='sm'>
						<Info />
					</Button>
				</Link>
				<Link to='/config' data-testid={testid.gotoConfig}>
					<Button variant='outline' size='sm'>
						<Settings />
					</Button>
				</Link>
				<Button variant='outline' size='sm' data-testid={testid.btnTheme} onClick={handleThemeToggle}>
					{theme === 'light' && <Sun />}
					{theme === 'dark' && <Moon />}
				</Button>
			</div>
		</nav>
	)
}
