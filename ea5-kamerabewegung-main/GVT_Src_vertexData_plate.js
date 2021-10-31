var plate = ( function() {

	function createVertexData() {


		var n = 16;
        var m = 4;
               




		// Positions.
		this.vertices = new Float32Array(3 * (n+1) * (m+1));
		var vertices = this.vertices;
		// Normals.
		this.normals = new Float32Array(3 * (n + 1) * (m + 1));
		var normals = this.normals;
		// Index data.
		this.indicesLines = new Uint16Array(2 * 2 * n * m);
		var indicesLines = this.indicesLines;
		this.indicesTris  = new Uint16Array(3 * 2 * n * m);
		var indicesTris = this.indicesTris;


		var dt = 2*Math.PI/n;
        var dr = 1/m;
                // Counter for entries in index array.
                var iLines = 0;
                var iTris = 0;



		// Loop angle t.
		for(var i=0, t=0; i <= n; i++, t += dt) {
			// Loop radius r.
			for(var j=0, r=0; j <= m; j++, r += dr){

				var iVertex = i*(m+1) + j;

                        var x = r * Math.cos(t);
                        var y = r * Math.sin(t);
                        var z = 0;

                        // Set vertex positions.
                        vertices[iVertex * 3] = x;
                        vertices[iVertex * 3 + 1] = y;
                        vertices[iVertex * 3 + 2] = z;

				// Calc and set normals.
				var nx = Math.cos(t) * Math.cos(r);
				var ny = Math.cos(t) * Math.sin(r);
				var nz = Math.sin(t);
				normals[iVertex * 3] = nx;
				normals[iVertex * 3 + 1] = ny;
				normals[iVertex * 3 + 2] = nz;

				// if(i>14){
				// continue;
				// }

				// Set index.
                        // Line on beam.
                        if(j>0 && i>0){
                            indicesLines[iLines++] = iVertex - 1;
                            indicesLines[iLines++] = iVertex;
                        }
				// Line on ring.
				if(j>0 && i>0){
					indicesLines[iLines++] = iVertex - (m+1);                            
					indicesLines[iLines++] = iVertex;
				} 

				// Set index.
                        // Two Triangles.
                        if(j>0 && i>0){
                            indicesTris[iTris++] = iVertex;
                            indicesTris[iTris++] = iVertex - 1;
                            indicesTris[iTris++] = iVertex - (m+1);
                            //        
                            indicesTris[iTris++] = iVertex - 1;
                            indicesTris[iTris++] = iVertex - (m+1) - 1;
                            indicesTris[iTris++] = iVertex - (m+1);    
                        }





			}
		}




		
	}

	return {
		createVertexData : createVertexData
	}

}());
