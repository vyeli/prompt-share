import "@/styles/global.css"

export const metadata = {
    title: "PromtShare",
    description: "PromtShare is a platform to Discover & Share AI Promts"
}


const Rootlayout = ({children}) => {
  return (
    <html lang="en">
        <body>
            <div className="main">
                <div className="gradient"/>
            </div>

            <main className="app">
                {children}
            </main>
        </body>
    </html>
  )
}

export default Rootlayout;