import {
    Card,
    CardBody,
    CardImg,
    CardSubtitle,
    CardText,
    CardTitle,
    Button,
} from "reactstrap";
import PropTypes from "prop-types";
import Image from "next/image";
import Link from "next/link";

const ProductModel = ({ image, title, subtitle, text, color,description,id }) => {
    const linkHref = id ? `/${id}` : '#';

    return (
        <Card>
            <Image alt="Card image cap" src={image} width={70} height={180} />
            <CardBody className="p-4">
                <CardTitle tag="h5">{title}</CardTitle>
                <CardSubtitle>{subtitle}</CardSubtitle>
                <CardText className="mt-3 text-muted">{text}</CardText>
                <CardText className="mt-3 text-muted">{description}</CardText>

                </CardBody>

        </Card>
    );
};

ProductModel.propTypes = {
    title: PropTypes.string,
    image: PropTypes.any,
    subtitle: PropTypes.string,
    text: PropTypes.string,
    color: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.string,



};
export default ProductModel;
