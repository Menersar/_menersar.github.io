var kegel = ( function() {

	function createVertexData() {
		var n = 8;
		var m = 1;

		

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

		 // colors
         this.color = new Float32Array(vertices.length*3);
         var color = this.color;

		var du = 2*Math.PI/n;
        var dv = .25/m;
        var r = 0.1;
		// Counter for entries in index array.
		var iLines = 0;
		var iTris = 0;
		var verschiebungY = 0;

		// Loop angle u.
		for(var i=0, u=-Math.PI; i <= n; i++, u += du) {
			// Loop height v.
			for(var j=0, v=0; j <= m; j++, v += dv) {

				var iVertex = i * (m + 1) + j;

				var x = r*Math.cos(u); 
                var z = r*Math.sin(u); 
                var y = v + verschiebungY;

				// Set vertex positions.
				vertices[iVertex * 3] = x;
				vertices[iVertex * 3 + 1] = y;
				vertices[iVertex * 3 + 2] = z;



			//	if (j < 8) {

                    color[iVertex * 4] = .0+ j/5;
                    color[iVertex * 4 + 1] = .0+j/10;
                    color[iVertex * 4 + 2] = .0 + j/20;
                    color[iVertex * 4 + 3] = 1;

            //    } 


				// Calc and set normals.
				var nx = Math.cos(u) * Math.cos(v);
				var ny = Math.cos(u) * Math.sin(v);
				var nz = Math.sin(u);
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
/*

		for (var i = 0; i < vertices.length*3; i +=4*3) {
            color[i] = 0;
            color[i+1] = 1;
            color[i+2] = 0;
            color[i+3] = 1;
    
        }

		
		for (var i = 0; i < vertices.length*1; i +=4) {
            color[i] = 1;
            color[i+1] = 1;
            color[i+2] = 1;
            color[i+3] = 1;
    
        }
*/
		
	}

	return {
		createVertexData : createVertexData
	}

}());
