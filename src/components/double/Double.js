import React, { useRef, useState } from 'react'
import { Canvas, useFrame } from 'react-three-fiber'
import TweenMax from 'gsap'
const THREE = require('three')


import * as vertexShader from './vertexShader.vert'
import * as fragmentShader from './fragmentShader.frag'
const texture =  new THREE.TextureLoader().load( './assets/texture.png')
const texture2 =  new THREE.TextureLoader().load( './assets/texture2.png')
// img.minFilter = THREE.LinearFilter;




const mouse = new THREE.Vector2(0, 0)
const uniforms = {
          u_image: { type: 't', value: texture },
          u_imagehover: { type: 't', value: texture2 },
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
            fragmentShader: fragmentShader,
            defines: {
            PR: window.devicePixelRatio.toFixed(1)

          }
         }]}
          transparent

      />
    </mesh>
  )
}



class Double extends React.Component{
  constructor(){
    super()
    this.state = {
      data: {},
      error: ''

    }
    this.componentDidMount = this.componentDidMount.bind(this)
    this.mouseMove = this.onMouseMove.bind(this)






  }


  componentDidMount(){



  }

  componentDidUpdate(){



  }

     onMouseMove(event) {
          TweenMax.to(mouse, 0.5, {
            x: (event.clientX / window.innerWidth) * 2 - 1,
            y: -(event.clientY / window.innerHeight) * 2 + 1
          })

          TweenMax.to(PlaneS.rotation, 0.5, {
            x: -mouse.y * 0.3,
            y: mouse.x * (Math.PI / 6)
          })


        }




  render() {



    return (
      <div onMouseMove={this.onMouseMove} className="body">
        <Canvas style={{ background: '#FFFFF' }}>
          {console.log(this)}
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <PlaneS position={[0, 0, 0]} />

        </Canvas>




      </div>




    )
  }
}
export default Double
