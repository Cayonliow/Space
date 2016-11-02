
function pointerLockSetup(){
    var havePointerLock = 'pointerLockElement' in document
    || 'mozPointerLockElement' in document
    || 'webkitPointerLockElement' in document;

    if ( havePointerLock ) {

        var element = document.body;
        var pointerlockchange = function ( event ) {
            if ( document.pointerLockElement === element
                || document.mozPointerLockElement === element
            || document.webkitPointerLockElement === element ) {
                controls.enabled = true;
                console.log('Enable control');
            } else {
                controls.enabled = false;
                console.log('Disable control');
            }
        }
        var pointerlockerror = function ( event ) {
            console.log('Pointer Lock Error');
        }

        // Hook pointer lock state change events
        document.addEventListener( 'pointerlockchange', pointerlockchange, false );
        document.addEventListener( 'mozpointerlockchange', pointerlockchange, false );
        document.addEventListener( 'webkitpointerlockchange', pointerlockchange, false );

        document.addEventListener( 'pointerlockerror', pointerlockerror, false );
        document.addEventListener( 'mozpointerlockerror', pointerlockerror, false );
        document.addEventListener( 'webkitpointerlockerror', pointerlockerror, false );

        element.addEventListener( 'click', function ( event ) {
            // Ask the browser to lock the pointer
            element.requestPointerLock = element.requestPointerLock
            || element.mozRequestPointerLock
            || element.webkitRequestPointerLock;

            element.requestPointerLock();
        }, false );

    } else {
        alert('Your browser doesn\'t support Pointer Lock API');
    }
}

/**
 * @author mrdoob / http://mrdoob.com/
*/

THREE.PointerLockControls = function ( camera ) {
    var scope = this;

    camera.rotation.set( 0, 0, 0 );

    var pitchObject = new THREE.Object3D();
    pitchObject.add( camera );

    var yawObject = new THREE.Object3D();
    yawObject.position.y = 0;
    yawObject.add( pitchObject );

    var PI_2 = Math.PI / 2;
    var onMouseMove = function ( event ) {
        if ( scope.enabled === false ) return;
            var movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
            var movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;
            yawObject.rotation.y -= movementX * 0.002;
            pitchObject.rotation.x -= movementY * 0.002;
            pitchObject.rotation.x = Math.max( - PI_2, Math.min( PI_2, pitchObject.rotation.x ) );
    };

    document.addEventListener( 'mousemove', onMouseMove, false );

    this.enabled = false;
    this.getObject = function () {
        return yawObject;
    };
    this.getDirection = function() {
        // assumes the camera itself is not rotated
        var direction = new THREE.Vector3( 0, 0, -1 );
        var rotation = new THREE.Euler( 0, 0, 0, "YXZ" );
        return function( v ) {
            rotation.set( pitchObject.rotation.x, yawObject.rotation.y, 0 );
            v.copy( direction ).applyEuler( rotation );
            return v;
        }
    }();
};

