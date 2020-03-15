import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from 'react-three-fiber'
import TweenMax from 'gsap'
const THREE = require('three')


import * as vertexShader from './vertexShader.vert'
import * as fragmentShader from './fragmentShader.frag'
const img =  new THREE.TextureLoader().load( './assets/texture.png')
// img.minFilter = THREE.LinearFilter;



function PlaneT(props) {
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
      scale={ [12, 6, 2]}
      onClick={e => setActive(!active)}
      onPointerOver={e => {
        setHover(true)
        // console.log(e)
      }}
      onPointerOut={e => setHover(false)}>
      <planeGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial attach="material"  map={img} color={0xffffff} >

      </meshStandardMaterial>
    </mesh>
  )
}
const mouse = new THREE.Vector2(0, 0)
const uniforms = {
          u_mouseX: { value: Math.abs(mouse.x) },
          u_mouseY: { value: Math.abs(mouse.Y) },
          u_mouse: { value: mouse },
          u_time: { value: 0 },
          u_res: { value: new THREE.Vector2(window.innerWidth/2, window.innerHeight/2) }
        }

function PlaneS(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  // Rotate mesh every frame, this is outside of React without overhead
  useFrame(() => {
    uniforms.u_time.value += 0.01
  }

    // mesh.current.rotation.x = mesh.current.rotation.y += 0.01
  )


  return (
    <mesh
      {...props}
      ref={mesh}
      scale={ [12, 6, 2]}
      onClick={e => setActive(!active)}
      onPointerOver={e => {
        setHover(true)
        // console.log(e)
      }}
      onPointerOut={e => setHover(false)}>
      <planeGeometry attach="geometry" args={[1, 1, 1]} />
      <shaderMaterial
        attach="material"
        args={[{
           uniforms: uniforms,
           vertexShader: vertexShader,
            fragmentShader: fragmentShader
         }]}
          transparent
      />
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
      <Canvas style={{ background: '#FFFFF' }}>
      {console.log(this)}
      <ambientLight />
   <pointLight position={[10, 10, 10]} />
   <PlaneT position={[0, 0, 0]} />
   <PlaneS position={[0, 0, 0]} />

      </Canvas>




      </div>




    )
  }
}
export default Cloud
