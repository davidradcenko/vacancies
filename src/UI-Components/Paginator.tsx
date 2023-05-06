import { Pagination } from '@mantine/core'
import { useState } from 'react'

export default function Paginator() {
	const [activePage, setPage] = useState(1)
	return (
		<>
			<div className='paginator'>
				<Pagination value={activePage} onChange={setPage} total={10} />
			</div>
		</>
	)
}
