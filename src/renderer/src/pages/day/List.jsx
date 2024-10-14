import { Button, Chip, Pagination, Spinner } from '@nextui-org/react'
import { CgArrowLongRightC } from 'react-icons/cg'
import { useEffect, useMemo, useState } from 'react'
import { FaCalendarDays } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import swal from 'sweetalert'
import ErrorAlert from '../../components/ErrorAlert'
import { getDays, deleteDay, createDay, stopeDay } from '../../redux/api/dayApi'
import { useDispatch, useSelector } from 'react-redux'
import { getLatestDay } from '../../redux/api/dayApi'
import { calculateHourDifference, formatDateToLocaleString } from '../../utils/utils'
import { FiEye } from 'react-icons/fi'
import {BiTrash } from 'react-icons/bi'
import CurrenChipTime from '../../components/currenChipTime'

export default function List() {
  const dispatch = useDispatch()
  const [isLOadingDelete, seIsLoadingDelete] = useState(false)
  const { days, loadingGet, error, day } = useSelector((state) => state.day)
  const [page, setPage] = useState(1)
  const rowsPerPage = 8

  useEffect(() => {
    dispatch(getDays())
    dispatch(getLatestDay())
  }, [dispatch])

  const { items, pages } = useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage
    return { items: days?.slice(start, end), pages: Math.ceil(days?.length / rowsPerPage) }
  }, [page, days, rowsPerPage])

  const [itemToDelete, setItemToDelete] = useState(null)

  useEffect(() => {
    if (itemToDelete) {
      swal({
        title: 'Êtes-vous sûr de vouloir supprimer ce jour ?',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      }).then((isOk) => {
        if (isOk) {
          seIsLoadingDelete(true)
          dispatch(deleteDay(itemToDelete , () => seIsLoadingDelete(false)))
        } else {
          setItemToDelete(null)
          seIsLoadingDelete(false)
        }
      })
    }
  }, [itemToDelete, dispatch])

  const handleStart = () => {
    dispatch(createDay({ startAt: new Date().toISOString() }))
  }
  const handleStop = () => {
    dispatch(
      stopeDay(day && day.id, {
        ...day,
        stopeAt: new Date().toISOString(),
        startAt: new Date(day.startAt).toISOString()
      })
    )
  }

  return (
    <section className="w-full flex flex-col items-center gap-3">
      <div className="w-full flex items-center justify-between pb-2">
        <h1 className="text-4xl font-bold underline flex gap-2">
          <FaCalendarDays /> Journées :
        </h1>
      </div>
      {days && day && days.length === 0 ? (
        <Button
          size="lg"
          variant="shadow"
          className="bg-gradient-to-br from-orange-700 to-yellow-500 border-small border-white/50 shadow-warning-500/30 text-white font-semibold"
          onClick={handleStart}
        >
          Démarrer
        </Button>
      ) : day ? (
        day?.stopeAt ? (
          <Button
            size="lg"
            variant="shadow"
            className="bg-gradient-to-br from-orange-700 to-yellow-500 border-small border-white/50 shadow-warning-500/30 text-white font-semibold"
            onClick={handleStart}
          >
            Démarrer
          </Button>
        ) : (
          <div className="w-fit flex flex-col items-center">
            <div className="bg-white p-4 rounded-lg flex items-center gap-1 w-fit dark:bg-[#43474b] dark:text-gray-400 text-gray-400">
              <Chip
                radius="sm"
                variant="shadow"
                color="primary"
                classNames={{
                  base: 'bg-gradient-to-br from-orange-700 to-yellow-500 border-small border-white/50 shadow-warning-500/30',
                  content: 'drop-shadow shadow-black text-white'
                }}
              >
                <span className="font-[500]">{`${new Date(day?.startAt).getHours()}h ${new Date(day?.startAt).getMinutes()}m`}</span>
              </Chip>
              <CgArrowLongRightC size={40} />
              <CurrenChipTime />
            </div>
            <div className="w-full py-1 flex justify-stretch items-start gap-2 ">
              <div>
                <Chip size="lg" radius="md" className="w-full">
                  {calculateHourDifference(day?.startAt, new Date().toISOString())}
                </Chip>
              </div>
              <div className="flex-1">
                <Button
                  size="sm"
                  radius="md"
                  color="danger"
                  className="text-md"
                  onClick={handleStop}
                  fullWidth
                >
                  Stop
                </Button>
              </div>
            </div>
          </div>
        )
      ) : (
        (day || days) && (
          <Button
            size="lg"
            variant="shadow"
            className="bg-gradient-to-br from-orange-700 to-yellow-500 border-small border-white/50 shadow-warning-500/30 text-white font-semibold"
            onClick={handleStart}
          >
            Démarrer
          </Button>
        )
      )}
      {days && items && (
        <Table
          items={items}
          setItemToDelete={setItemToDelete}
          itemToDelete={itemToDelete}
          isLOadingDelete={isLOadingDelete}
        />
      )}
      {loadingGet && (
        <div className="py-5 w-full flex justify-center">
          <Spinner size="lg" label="Chargement ..." />
        </div>
      )}
      {error && (
        <div className="w-full">
          <ErrorAlert message={error} />
        </div>
      )}
      <div className="my-4  w-full flex ">
        {pages > 1 && (
          <Pagination
            showControls
            isCompact
            total={pages}
            page={page}
            onChange={(page) => setPage(page)}
            showShadow
          />
        )}
      </div>
    </section>
  )
}

const Table = ({ items, setItemToDelete, isLOadingDelete, itemToDelete }) => {
  return (
    <div className="rounded-lg h-[450px] w-full mt-4">
      <div className="overflow-x-auto rounded-t-lg w-full justify-center shadow-[0px_0px_7px_-2px_rgba(0,0,0,0.75)] rounded-lg">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white dark:divide-gray-700 dark:bg-[#43474b]">
          <thead className="ltr:text-left rtl:text-right">
            <tr className="font-normal">
              <th className="whitespace-nowrap px-2 py-1 text-gray-900 dark:text-white font-semibold text-start">
                Date de début
              </th>
              <th className="whitespace-nowrap px-2 py-1 text-gray-900 dark:text-white font-semibold text-start">
                Date de fin
              </th>
              <th className="whitespace-nowrap px-2 py-1 text-gray-900 dark:text-white font-semibold text-start">
                Durée
              </th>
              <th className="whitespace-nowrap px-2 py-1 text-gray-900 dark:text-white font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700 font-sans tracking-wide">
            {items.length > 0 ? (
              items.map((day) => (
                <tr className="hover:bg-blue-200 dark:hover:bg-gray-900" key={day.id}>
                  <td className="whitespace-nowrap px-2 py-1 font-medium text-gray-900 dark:text-white">
                    {day.stopeAt ? (
                      <Chip
                        radius="sm"
                        variant="shadow"
                        color="primary"
                        classNames={{
                          base: 'bg-gradient-to-br from-green-500 to-yellow-500 border-small border-white/50 shadow-warning-500/30',
                          content: 'drop-shadow shadow-black text-black'
                        }}
                      >
                        {formatDateToLocaleString(day.startAt)}
                      </Chip>
                    ) : (
                      <Chip
                        radius="sm"
                        variant="shadow"
                        color="primary"
                        classNames={{
                          base: 'bg-gradient-to-br from-orange-700 to-yellow-500 border-small border-white/50 shadow-warning-500/30',
                          content: 'drop-shadow shadow-black text-white'
                        }}
                      >
                        <span className="font-[500]">{formatDateToLocaleString(day.startAt)}</span>
                      </Chip>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-2 py-1 font-medium text-gray-900 dark:text-white">
                    {day.stopeAt ? (
                      <Chip
                        radius="sm"
                        color="primary"
                        variant="shadow"
                        classNames={{
                          base: 'bg-gradient-to-br from-green-500 to-yellow-500 border-small border-white/50 shadow-warning-500/30',
                          content: 'drop-shadow shadow-black text-black'
                        }}
                      >
                        {formatDateToLocaleString(day.stopeAt)}{' '}
                      </Chip>
                    ) : (
                      <CurrenChipTime />
                    )}
                  </td>
                  <td className="whitespace-nowrap px-2 py-1 font-medium text-gray-900 dark:text-white">
                    <Chip color={day.stopeAt ? 'success' : 'default'} variant="shadow">
                      {' '}
                      {calculateHourDifference(
                        day?.startAt,
                        day?.stopeAt
                          ? new Date(day.stopeAt).toISOString()
                          : new Date().toISOString()
                      )}
                    </Chip>
                  </td>
                  <td className="whitespace-nowrap px-2 py-1">
                    <div className="flex justify-center w-full items-center gap-2">
                      {' '}
                      {day.stopeAt && (
                        <>
                          {/* <Button
                            size="sm"
                            isIconOnly
                            radius="md"
                            className="text-xl"
                            color="warning"
                            variant="ghost"
                            as={Link}
                            to={`/days/update/${day.id}`}
                          >
                            <BiSolidEdit />
                          </Button> */}
                        </>
                      )} <Button
                      size="sm"
                      isIconOnly
                      radius="md"
                      className="text-xl"
                      color="primary"
                      variant="ghost"
                      as={Link}
                      to={`/days/show/${day.id}`}
                    >
                      <FiEye />
                    </Button>
                      <Button
                        size="sm"
                        isIconOnly
                        radius="md"
                        className="text-xl"
                        color="danger"
                        variant="ghost"
                        onClick={() => setItemToDelete(day.id)}
                        isLoading={day.id === itemToDelete ? isLOadingDelete : false}
                        spinner={isLOadingDelete && <Spinner color="danger" size="sm" />}
                      >
                        <BiTrash className="text-danger group-hover:text-white" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4}>
                  <div className="flex items-center justify-center font-semibold text-lg py-5 text-red-500">
                    Aucun jour trouvé
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

