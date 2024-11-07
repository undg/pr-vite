import type { FC, PropsWithChildren } from 'react'
import { useTheme } from '../config/use-theme'
import { H1 } from '../primitives/typography'
import { cn } from '../utils/cn'
import { TopNav } from './top-nav'

export const Layout: FC<PropsWithChildren<{ header?: string }>> = props => {
	const [theme] = useTheme()
	return (
		<div
			className={cn(
				//
				'flex h-full min-h-screen w-full justify-center bg-background text-foreground',
				theme === 'dark' && 'dark',
				theme === 'light' && 'light',
			)}
		>
			<div className='w-full max-w-screen-lg bg-muted p-8 pt-12'>
				<H1>{props.header ?? ''}</H1>
				<TopNav />
				<main>{props.children}</main>
			</div>
		</div>
	)
}
