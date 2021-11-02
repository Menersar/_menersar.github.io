var zylinderNase = ( function() {

	function createVertexData() {
		var n = 4;
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

		var du = 2*Math.PI/n;
        var dv = .7/m;
        var r = 0.1;
		// Counter for entries in index array.
		var iLines = 0;
		var iTris = 0;
		var verschiebungX = 0;
		var verschiebungY = 1.25;
		var verschiebungZ = 0;

		// Loop angle u.
		for(var i=0, u=-Math.PI; i <= n; i++, u += du) {
			// Loop height v.
			for(var j=0, v=0; j <= m; j++, v += dv) {

				var iVertex = i * (m + 1) + j;

				/*var z = v * Math.cos(u) * 0.3;
        		var y = v * Math.sin(u) * 0.3;
        		var x = v;
*/
				var y = .6*v*Math.cos(u) ; 
                var z = .6*v*Math.sin(-u); 
                var x = v;
				

				// Set vertex positions.
				vertices[iVertex * 3] = x + verschiebungX;
				vertices[iVertex * 3 + 1] =  y + verschiebungY;
				vertices[iVertex * 3 + 2] = z + verschiebungZ;	



			

				// Calc and set normals.
				var nx = Math.cos(u) * Math.cos(v);
				var nz = Math.cos(u) * Math.sin(v);
				var ny = Math.sin(u);
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
