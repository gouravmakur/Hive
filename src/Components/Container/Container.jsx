import React from 'react'

//container accepts children components as props
// we apply classes in container and in future if we want to change any style properties we change the classes of container

function Container({children}) {
  return (
    <div>
        {children}
    </div>
  )
}

export default Container
