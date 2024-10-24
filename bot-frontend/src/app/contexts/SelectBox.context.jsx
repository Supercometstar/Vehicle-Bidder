import { createContext, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

export const SelectBoxContext = createContext()

export const SelectBoxProvider = ({ children }) => {

	const [ selectedBox, setSelectedBox ] = useState({})
	const urlInfos = useSelector(store => store.bid.urlInfos)

	useEffect(() => {
		if (selectedBox.id !== undefined) {
			urlInfos.map((item) => {
				if (item.id === selectedBox.id) {
					setSelectedBox(item)
				}
			})
		}
	}, [ urlInfos ])

	return (
		<SelectBoxContext.Provider value={{ selectedBox, setSelectedBox }}>
			{ children }
		</SelectBoxContext.Provider>
	)

}