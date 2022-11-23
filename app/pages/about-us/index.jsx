import React, {useEffect, useState, useRef} from 'react'
import {Box, Container, Stack, Input, Button} from '@chakra-ui/react'
import Seo from '../../components/seo'
import {useLocation} from 'react-router-dom'
import useEinstein from '../../commerce-api/hooks/useEinstein'
import Section from '../../components/section'
import ProductTileHome from '../../components/product-tile-home'
import {useCommerceAPI} from '../../commerce-api/contexts'
import {getProduct} from '../../hooks/use-product-custom'

const AboutUs = () => {
    const location = useLocation()
    const einstein = useEinstein()
    const api = useCommerceAPI()

    /**************** Einstein ****************/
    useEffect(() => {
        einstein.sendViewPage(location.pathname)
    }, [])

    const [product, setProduct] = useState()
    const inputRef = useRef()

    const handleClick = async () => {
        let product = await getProduct(inputRef.current.value, api)
        setProduct(product)
    }

    return (
        <Box data-testid="about-us-page" bg="gray.50" py={[8, 16]}>
            <Seo title="About us" description="About us page" />
            <Container>
                <Section>
                    <Box>
                        <Stack spacing={5}>
                            <Input placeholder="Add product ID" size="lg" ref={inputRef} />
                            <Button size="md" onClick={handleClick}>
                                Button
                            </Button>
                        </Stack>
                    </Box>
                </Section>
                {product && (
                    <Section>
                        <Box width={'30%'} margin={'auto'}>
                            <Box textAlign={'center'}>
                                <h1>{product.id}</h1>
                                <h2>{product.name}</h2>
                            </Box>
                            <ProductTileHome product={product} enableFavourite></ProductTileHome>
                        </Box>
                    </Section>
                )}
            </Container>
        </Box>
    )
}

AboutUs.getTemplateName = () => 'about-us'

export default AboutUs
