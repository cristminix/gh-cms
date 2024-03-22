import Template from "@templates/blocks/brand.twig"

const TwigTemplate = ({  }) => {
    const content = Template.render({company:{
        name: "Green Ponpes",
        logo : "/themes/green-ponpes/images/logo/logo.png",
    }})
    return (
        <div dangerouslySetInnerHTML={{ __html: content }} />
    )
}

export default TwigTemplate