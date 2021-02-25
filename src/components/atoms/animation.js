export const basicStagger = {
    show: {
        transition: {
        delayChildren: 0.5,
        duration: 0.75, 
        staggerChildren: 0.2
        }
    },
    hide: {
        transition: {
        duration: 0.75, 
        staggerChildren: 0.2
        }
    }
}

export const basicStaggerChild = {
    show: {
        opacity: 1,
        y: 0
    },
    hide: {
        opacity: 0,
        y: 10
    }
}

export const libraryEntry = {
    show: {
        opacity: 1,
        y: 0,
        pointerEvents: 'initial',
        transition: {
            delay: 0.5
        }
    },
    hide: {
        opacity: 0,
        y: 10,
        pointerEvents: 'none',
    }
}

export const topicsDropdown = {
    show: {
        height: 'auto'
    },
    hide: {
        height: 0,
    }
}