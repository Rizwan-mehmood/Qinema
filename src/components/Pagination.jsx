import React from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

function getPageItems(current, total) {
    const delta = 2
    const range = []
    const rangeWithDots = []

    for (let i = 1; i <= total; i++) {
        if (
            i === 1 ||
            i === total ||
            (i >= current - delta && i <= current + delta)
        ) {
            range.push(i)
        }
    }

    let last = 0
    for (const page of range) {
        if (page - last > 1) {
            rangeWithDots.push('ellipsis')
        }
        rangeWithDots.push(page)
        last = page
    }

    return rangeWithDots
}

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const items = getPageItems(currentPage, totalPages)

    return (
        <div className="flex items-center justify-center mt-8 space-x-2">
            {/* Prev */}
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded disabled:opacity-50 hover:bg-primary/10"
            >
                <ChevronLeftIcon />
            </button>

            {/* Page buttons & ellipses */}
            {items.map((item, idx) =>
                item === 'ellipsis' ? (
                    <span key={`dot-${idx}`} className="px-2 text-gray-400 select-none">
                        …
                    </span>
                ) : (
                    <button
                        key={`page-${item}`}
                        onClick={() => onPageChange(item)}
                        className={`px-3 py-1 rounded-md ${item === currentPage
                            ? 'bg-primary text-white'
                            : 'hover:bg-primary/10'
                            }`}
                    >
                        {item}
                    </button>
                )
            )}

            {/* Next */}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded disabled:opacity-50 hover:bg-primary/10"
            >
                <ChevronRightIcon />
            </button>
        </div>
    )
}

export default Pagination
