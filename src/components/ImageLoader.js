import { StaticQuery, graphql } from 'gatsby';
import { GatsbyImage } from "gatsby-plugin-image";
import React from 'react';


class ImageLoader extends React.Component {
	state = {
		pic: this.props.data.allImageSharp.edges.find(x => x.node.fluid.originalName === this.props.imgName),
	};

	render() {
		if (this.state.pic !== undefined)
		return <GatsbyImage alt='' image={this.state.pic.node.gatsbyImageData} style={{
			left: 0,
			top: 0,
			width: "100%",
			height: "100%"
		}} />;
		return (<>oops</>)
	}
};

const rendered = (props) => (
	<StaticQuery
		query={graphql`
      query {
          allImageSharp {
            edges {
              node {
                gatsbyImageData(layout: FULL_WIDTH, placeholder: TRACED_SVG)
				fluid {
					originalName
				}
              }
            }
          }
        }

    `}
		render={data => <ImageLoader data={data} {...props} />}
	/>
);

export default rendered;
