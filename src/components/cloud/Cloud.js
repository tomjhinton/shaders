import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from 'react-three-fiber'
import TweenMax from 'gsap'
const THREE = require('three')


import * as vertexShader from './vertexShader.vert'
import * as fragmentShader from './fragmentShader.frag'
const img =  new THREE.TextureLoader().load( './assets/texture.png')
img.minFilter = THREE.LinearFilter;
function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {

  }

    // mesh.current.rotation.x = mesh.current.rotation.y += 0.01
  )


  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [8, 4, 1.5] : [4, 1, 1]}
      onClick={e => setActive(!active)}
      onPointerOver={e => {
        setHover(true)
        // console.log(e)
      }}
      onPointerOut={e => setHover(false)}>
      <planeGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material"  map={img}>

      </meshStandardMaterial>
    </mesh>
  )
}


class Cloud extends React.Component{
  constructor(){
    super()
    this.state = {
      data: {},
      error: ''

    }
    this.componentDidMount = this.componentDidMount.bind(this)
    this.mouseMove = this.mouseMove.bind(this)






  }


  componentDidMount(){



  }

  componentDidUpdate(){



  }

  mouseMove(e){

    //console.log(e)

    this.setState({bass: `${e.screenX /100000} ${e.screenY /100000} `, scale: `${e.screenY /2}` })
  }




  render() {



    return (
      <div onMouseMove={this.mouseMove} className="body">
      <Canvas>
      {console.log(this)}
      <ambientLight />
   <pointLight position={[10, 10, 10]} />
   <Box position={[-1.2, 0, 0]} />
   <Box position={[1.2, 0, 0]} />
      </Canvas>




      </div>




    )
  }
}
export default Cloud
