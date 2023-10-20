import React from 'react'

import { Text } from '@/utils/theme'
import { format } from 'date-fns'

const getGreeting = ({ hour }: { hour: number }) => {
	if (hour < 12) {
		return 'morning'
	}
	if (hour < 18) {
		return 'evening'
	} else {
		return 'night'
	}
}

const greeting = getGreeting({ hour: new Date().getHours() })

const today = new Date()

const Greeting = () => {
	return (
		<>
			<Text variant='textXl' fontWeight='500' color='slate100'>
				Good {greeting} Maks
			</Text>
			<Text variant='textXl' fontWeight='500' color='slate100'>
				It's {format(today, 'eeee, LLL dd')}
			</Text>
		</>
	)
}

export default Greeting
