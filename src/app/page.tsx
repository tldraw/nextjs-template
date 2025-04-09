'use client'
import { Tldraw, useEditor } from 'tldraw'
import { useEffect } from 'react'

// Custom hook to handle persistence
function usePersistence() {
    const editor = useEditor()

    useEffect(() => {
        if (!editor) return

        // Load initial state from local storage
        const saved = localStorage.getItem('tldraw_state')
        if (saved) {
            editor.loadSnapshot(JSON.parse(saved))
        }

        // Save state on changes
        const handleChange = () => {
            const snapshot = editor.store.getSnapshot()
            localStorage.setItem('tldraw_state', JSON.stringify(snapshot))
        }

        editor.store.listen(handleChange, { scope: 'document' })
        return () => editor.store.unlisten(handleChange)
    }, [editor])
}

// Component to trigger the hook
function PersistenceHandler() {
    usePersistence()
    return null
}

export default function Home() {
    return (
        <main>
            <div style={{ position: 'fixed', inset: 0 }}>
                <Tldraw>
                    <PersistenceHandler />
                </Tldraw>
            </div>
        </main>
    )
}
