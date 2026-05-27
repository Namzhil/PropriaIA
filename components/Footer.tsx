export default function Footer({ dict }: { dict: any }) {
  const brand = dict.brand as string;
  const brandParts = brand.split(/(AI|IA)/);
  const highlight = brand.match(/(AI|IA)/)?.[0] || '';

  return (
    <footer>
      <div className="footer-content">
        <div>
          <div className="footer-brand">Pro<span>pria{highlight}</span></div>
          <p className="footer-desc">{dict.footer.desc}</p>
        </div>
        <div className="footer-col">
          <h4>{dict.footer.col1Title}</h4>
          <a href="#">{dict.footer.col1Item1}</a>
          <a href="#">{dict.footer.col1Item2}</a>
        </div>
        <div className="footer-col">
          <h4>{dict.footer.col2Title}</h4>
          <a href="#">{dict.footer.col2Item1}</a>
          <a href="#">{dict.footer.col2Item2}</a>
          <a href="#">{dict.footer.col2Item3}</a>
        </div>
        <div className="footer-col">
          <h4>{dict.footer.col3Title}</h4>
          <a href="#">{dict.footer.col3Item1}</a>
          <a href="#">{dict.footer.col3Item2}</a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>{dict.footer.copyright}</span>
        <span>{dict.footer.version}</span>
      </div>
    </footer>
  );
}