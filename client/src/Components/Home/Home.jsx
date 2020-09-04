import React from 'react';
//import Carousel from './Carousel.js';
import './Home.css';
import {Link} from 'react-router-dom';

function Home() {
	return (
		<div className="Home">
			<body>
				<div className="Carousel">
					<h1>Carousel</h1>
				</div>
				<Link to="/product_form">
					<h3>Product Form</h3>
				</Link>
				<Link to="/category_form">
					<h3>Category Form</h3>
				</Link>

				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sit amet ex eu sapien
					faucibus molestie. In pulvinar dictum libero eu lacinia. Aenean aliquam sem sed
					tellus dignissim venenatis. Vivamus et aliquet enim. Nam consectetur et lacus quis
					malesuada. Phasellus sit amet lorem suscipit sem convallis malesuada. Ut eget justo
					eleifend nisi facilisis imperdiet. Morbi scelerisque tristique ipsum eget tincidunt.
					Nam ultricies eu velit et imperdiet. Etiam ullamcorper odio risus, eu malesuada ex
					bibendum pretium.
				</p>

				<p>
					Aliquam eu laoreet felis. Donec faucibus magna sit amet libero varius, at placerat
					ipsum lobortis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
					posuere cubilia curae; Vestibulum fringilla sem et metus feugiat sollicitudin.
					Integer pharetra egestas libero at varius. Morbi mollis est at tortor lobortis, quis
					sollicitudin sapien pharetra. Nunc interdum venenatis mi eu varius. Donec non
					molestie diam, nec luctus sem. Mauris consequat, lectus vitae vulputate mattis,
					tortor tortor rhoncus purus, vitae cursus odio orci vitae sapien. Integer sit amet
					lobortis nunc. Integer maximus pharetra odio, vel vehicula diam dapibus id. Cras non
					nulla ac enim varius dictum. Morbi dictum est sit amet turpis dignissim bibendum. Nam
					gravida sapien enim, ut tincidunt felis consectetur pretium.
				</p>

				<p>
					Suspendisse vel finibus nibh. Nunc vel arcu id felis cursus mollis. Morbi vitae orci
					et sapien pharetra ornare. Pellentesque habitant morbi tristique senectus et netus et
					malesuada fames ac turpis egestas. Sed porta at mauris quis porta. Nullam eu
					fermentum massa, ut viverra ipsum. Aenean quis porta lorem. Nullam a erat auctor,
					vulputate ante a, dapibus lorem. Integer euismod interdum lacus, et imperdiet lorem
					gravida nec.
				</p>

				<p>
					Maecenas a erat malesuada, lacinia nulla a, commodo felis. Mauris fermentum cursus
					lorem, non facilisis ante lacinia ac. Maecenas in justo in quam luctus hendrerit ac
					vel ante. Vivamus non leo id sapien aliquam malesuada et non felis. Proin vulputate
					sit amet ante vitae fringilla. Sed iaculis tortor sit amet felis congue aliquam id eu
					magna. Fusce rhoncus mollis libero, ut mollis eros suscipit et. Curabitur nulla sem,
					pulvinar eu sagittis ac, varius a ante. Sed aliquet suscipit magna eget feugiat.
					Quisque a libero ex. Etiam varius eget magna et dictum. Nulla facilisi. In imperdiet
					in arcu vel fermentum. Class aptent taciti sociosqu ad litora torquent per conubia
					nostra, per inceptos himenaeos. Ut nec arcu malesuada, scelerisque nunc porta,
					placerat arcu. Nam pretium auctor massa ut convallis.
				</p>

				<p>
					In consequat, est ut faucibus mattis, dui nibh pretium ante, ac vestibulum lorem urna
					quis dui. Nunc pellentesque augue at diam convallis, sed consequat erat accumsan.
					Nulla sagittis neque ut odio tincidunt imperdiet. Quisque fringilla, lacus non
					accumsan elementum, mi nunc tincidunt nisi, vestibulum vehicula turpis ligula sit
					amet dolor. In convallis vitae nunc ac mattis. Morbi condimentum eu ante non dapibus.
					Aliquam condimentum velit risus, a porttitor dui facilisis ut. Quisque convallis orci
					malesuada elit tincidunt fermentum. Donec eget sollicitudin metus, eu egestas nibh.
					Sed tempus risus arcu, a tempor urna tincidunt sed. Nulla ut consectetur velit, in
					venenatis nisi. Mauris nec dolor eget felis dictum efficitur pretium at risus. Cras
					ac nunc diam. Sed sit amet sem ut diam convallis blandit. Sed lacus arcu, lobortis
					sit amet posuere eu, mollis id libero.
				</p>
			</body>
		</div>
	);
}
/**/
export default Home;
