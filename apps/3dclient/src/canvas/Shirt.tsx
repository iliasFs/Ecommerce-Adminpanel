/* eslint-disable @typescript-eslint/no-unused-vars */
import { easing } from "maath";
import { useSnapshot } from "valtio";
import { useFrame } from "@react-three/fiber";
import { Decal, useGLTF, useTexture } from "@react-three/drei";
import state from "../store";
import { BufferGeometry } from "three";

const Shirt = () => {
  const snap = useSnapshot(state);
  const { nodes, materials } = useGLTF("/shirt_baked.glb");

  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);

  //apply the color smoothly
  useFrame((state, delta) =>
    easing.dampC(materials.lambert1.color, snap.color, 0.25, delta)
  );

  //sometimes the model doesn't render so we place a key to the group and when the state changes it renders for sure
  const stateString = JSON.stringify(snap);

  return (
    <group key={stateString}>
      <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry as BufferGeometry}
        material={materials.lambert1}
        material-roughness={1}
        dispose={null}
      >
        //Showing the logo or the full texture. Toggling
        {snap.isFullTexture && (
          <Decal
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={1}
            map={fullTexture}
          />
        )}
        {snap.isLogoTexture && (
          <Decal
            position={[0, 0.04, 0.15]}
            rotation={[0, 0, 0]}
            scale={0.15}
            map={logoTexture}
            map-anisotropy={16} // quality of the texture
            depthTest={false} //makes sure it is rendered on top of other objects on the scene
            depthWrite={true}
          />
        )}
      </mesh>
    </group>
  );
};

export default Shirt;
