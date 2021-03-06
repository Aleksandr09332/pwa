import { Alert, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { getAlbums, parseError } from '../../store/api/jsonPlaceholderApi/hooks';
import AlbumItem from './components/AlbumItem';
import Layout from '../../components/Layout';
import './index.css';

function Main() {
  const { t } = useTranslation<string>();
  const { isLoading, data, error } = getAlbums();
  let content = null;

  if (error) {
    content = <Alert message={parseError(error)} type="error" />;
  } else if (isLoading) {
    content = t('global.loading');
  } else if (data?.length) {
    content = (
      <Row gutter={[24, 24]}>
        {data.map((item) => (
          <Col key={item.id} xs={24} sm={12} md={8} lg={6}>
            <AlbumItem data={item} />
          </Col>
        ))}
      </Row>
    );
  }

  return <Layout title={t('global.albums')}>{content}</Layout>;
}

export default Main;
