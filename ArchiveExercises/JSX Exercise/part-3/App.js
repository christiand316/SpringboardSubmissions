function App() {
    return (
        <div>
            <Person 
                name='buzzardius'
                age={1}
                hobbies={['collecting water', 'scouting nest locations', 'collecting nectar from pink flowers']}
            />
            <Person 
                name='kyree the immortal and ageless bee'
                age= {19}
                hobbies={['collecting nectar', 'organizing the honey', 'collecting pollen from red flowers', 'being immortal']}
            />
            
            <Person 
                name='bumble'
                age={0.3}
                hobbies={['collecting pollen', 'making honey', 'collecting pollen from blue flowers']}
            />
            
            
        </div>
    )
}