import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import IncidentsAnalysis from '../../../analytics'

export default function ModalDialog({ isOpen, setIsOpen } : { isOpen: boolean, setIsOpen: (val: boolean) => void }) {

  return (
    <div>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-[55vw] sm:p-6 data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <div>
                <IncidentsAnalysis setIsOpen={setIsOpen} />
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  )
}
