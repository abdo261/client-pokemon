import { FaRegMoon } from 'react-icons/fa'
import { MdOutlineLightMode } from 'react-icons/md'
import { Button } from '@nextui-org/react'

const ToggleThem = ({ size = 'sm',className="cursor-none hidden sm:flex",dark ,toggleDark  }) => {
 
 
  return (
    <span className={className}>
      <Button
        isIconOnly
        className="text-lg cursor-pointer"
        radius="full"
        variant="bordered"
        size={size}
       onClick={toggleDark}
      >
        {dark ? <MdOutlineLightMode />: <FaRegMoon /> }
      </Button>

    </span>
  )
}

export default ToggleThem
