import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import InfiniteScroll from 'react-infinite-scroll-component'
import { experimentalStyled as styled } from '@mui/material/styles'
import convert from "xml-js"
import {
    HomeAPI
} from '../../api'

import ModalDetail from './modal-detail'

import {
    Header
} from '../../components'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Home = () => {
    const [page, setPage] = useState(1)
    const [param, setParam] = useState('')
    const [detail, setDetail] = useState(false)
    const [dataItem, setDataItem] = useState({
        name : '',
        text : '',
        url_img : '',
    })
    const [product,setProduct] = useState<{name:{_text : string}, prod_no :string, category : string}[]>([])

    const handleClose = () => {
        setDetail(false)
        setDataItem({
            name : '',
            text : '',
            url_img : '',
        })
    }

    const Get = async () => {
        try {
            const response = await HomeAPI.GetProduct(page)
            let result = convert.xml2json(response, {compact: true, spaces: 4})
                if (param) {
                    const newData = product.filter(
                    function (item) {
                        const itemData = item.name
                            ? item.name._text.toUpperCase()
                            : ''.toUpperCase()
                        const textData = param.toUpperCase()
                        return itemData.indexOf(textData) > -1
                    }
                    );
                    setProduct(newData)
                } else {
                    setProduct(JSON.parse(result).Products.product.map((e: any) => {
                        return { prod_no : e.prdNo, name : e.prdNm, category : e.dispCtgrNm}
                    }))
                }
        } catch (err) {
            return err
        }
    }

    const getDetail = async (data :any) => {
        try {
            const response = await HomeAPI.GetProductDetail(data.prod_no._text)
            let result = convert.xml2json(response, {compact: true, spaces: 4})
            let prod_name = JSON.parse(result).Product.prdNm._text
            let prod_text = JSON.parse(result).Product.htmlDetail._text
            let prod_img = JSON.parse(result).Product.prdImage01._text
            setDataItem({
                name : prod_name,
                text : prod_text,
                url_img : prod_img,
            })
        } catch (err) {
            return err
        }
    }

    useEffect(()=> {
        Get()
    },[page, param])

    return (
        <div>
            <Header
            setParam={setParam}
            param={param}
            />
            <InfiniteScroll
                dataLength={product.length}
                next={()=>setPage(page+1)}
                hasMore={true}
                loader={<h3> Loading...</h3>}
                endMessage={<h4>Nothing more to show</h4>}
            >
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        {
                            product.map((e,i) =>
                                    <Grid item xs={2} sm={4} md={4} key={i}>
                                        <Item>
                                            <img width={'300px'} height={'200px'} src='https://source.unsplash.com/random' />
                                            <p>{e.name._text}</p>
                                            <button onClick={()=>{
                                                console.log('value click e :', e)
                                                getDetail(e)
                                                setDetail(true)
                                                }}>Detail</button>
                                        </Item>
                                    </Grid>
                            )
                        }
                    </Grid>
                </Box>
            </InfiniteScroll>
            <ModalDetail
            open={detail}
            dataItem={dataItem}
            handleClose={handleClose}
            />
        </div>
    )
}
export default Home