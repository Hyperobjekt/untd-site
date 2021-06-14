export const basicStagger = {
    show: {
        transition: {   
        delayChildren: 1,
        duration: 0.75, 
        staggerChildren: 0.2,
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
        y: 0,
        transition: {
            duration: 0.5,
            delay: 0,
        }
    },
    hide: {
        opacity: 0,
        y: 30
    }
}
export const basicStaggerChildLeft = {
    show: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6,
            delay: 0,
        }
    },
    hide: {
        opacity: 0,
        x: -30
    }
}
export const basicStaggerChildDown = {
    show: {
        opacity: 1,
        y: 0,
        transition: {
            delay: 0,
            duration: 0.5,
        }
    },
    hide: {
        opacity: 0,
        y: -30
    }
}
export const basicStaggerChildRight = {
    show: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.1,
            delay: 0,
        }
    },
    hide: {
        opacity: 0,
        x: 30
    }
}
export const basicStaggerChildStatic = {
    show: {
        opacity: 1,
        transition: {
            duration: 0.5,
            delay: 0.25,
            staggerChildren: 15,
            staggerDirection: 1,
        }
    },
    hide: {
        opacity: 0,
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
        y: 20,
        pointerEvents: 'none',
    }
}

export const faqHideShow = {
    show: {
        height: 'auto'
    },
    hide: {
        height: 0,
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