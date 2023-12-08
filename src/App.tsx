import { Page1Component } from '../components/Page1Component'
import { Component1 } from '../components/Component1'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <main style={{ height: "100dvh", width: "100dvw", display: "flex", flexGrow: 1, justifyContent: "center", alignItems: "center" }}>
        <BrowserRouter>
        <Routes>
          <Route>
            <Route index path="/login" element={<Page1Component />} />
            <Route path="/" element={<Component1 />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App
