import { Card, CardBody, Chip, Tab, Tabs } from '@nextui-org/react'
import React from 'react'
import { PiListMagnifyingGlassDuotone } from 'react-icons/pi'
import SelectFilter from './SelectFilter'
import SelectNormal from './SelectNormal'
import { CiBoxList } from 'react-icons/ci'

const Index = () => {
  return (
    <div className="flex w-full flex-col items-center  p-0 m-0">
      <Tabs aria-label="Options" size="lg"  variant="solid" fullWidth>
        <Tab
          className="w-full text-lg"
          key="filterSelect"
          title={
            <div className="flex items-center gap-2">
              <CiBoxList size={30} />
              {/* <span>Normal</span> */}
            </div>
          }
        >
          <Card className="w-full">
            <CardBody>
              <SelectNormal />
            </CardBody>
          </Card>
        </Tab>
        <Tab
          className="w-full text-lg"
          key="filtré"
          title={
            <div className="flex items-center gap-2">
              <PiListMagnifyingGlassDuotone size={30} />
              {/* <span>Filtré</span> */}
            </div>
          }
        >
          <Card>
            <CardBody className="w-full">
              <SelectFilter />
            </CardBody>
          </Card>
        </Tab>
      </Tabs>
    </div>
  )
}

export default Index
