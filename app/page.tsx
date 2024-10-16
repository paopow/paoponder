import Image from "next/image";
import styles from "./page.module.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Home() {
  return (
    <>
    <section className="hero section" style={{background: "#F2CB05"}}>
    <div className="hero-body">

      <div className="columns">
        <div className="column is-one-third">
          <img className="is-rounded" src="/profile-square.jpg" width="360" height="360" style={{borderRadius: '50%'}}/>
        </div>
        <div className="column is-size-4">
          <div className="mt-5">
          <div className="is-size-1 has-text-weight-bold">Hi, I&apos;m Pao Siangliulue</div>
            I am a research scientist at the&nbsp;
            <a href="https://allenai.org/">Allen Institute for AI</a> on
            the <a href="https://research.semanticscholar.org/">Semantic Scholar</a> team.&nbsp;
            Before AI2, I was a tech lead at <a href="https://www.b12.io/">B12</a>.
            I finished my Ph.D. in Computer Science at Harvard University.
            I was advised by <a href="https://www.eecs.harvard.edu/~kgajos/">Krzysztof Gajos</a>&nbsp;
            from the <a href="https://iis.seas.harvard.edu/">Intelligent Interactive Systems Group</a>.
          </div>
          <p className="mt-5">
            My research focuses on building systems to support human creativity and knowledge-based decision making.&nbsp;
            I am particularly interested in human-AI collaboration to&nbsp;
            synthesize existing information and generate new ideas.
            {/* Check out my publications list for what I have been thinking about or a blog post for recent thoughts      */}
          </p>
          <p className="mt-5">
            I love painting and sketching. You can see my artwork on my <a href="https://www.instagram.com/siangliulue/" target="_blank">
            <FontAwesomeIcon icon={['fab', 'instagram']} size="xs" /> Instagram</a> profile.
          </p>
          <div className="mt-5 pt-3" style={{textDecoration: 0}}>
            <button className="button is-primary is-rounded mr-2 mt-2">
              <a href="https://twitter.com/siangliulue" style={{color: "inherit"}} target="_blank">
              <FontAwesomeIcon icon={['fab', 'twitter']} size="xs" />&nbsp;Twitter
              </a>
            </button>
            <button className="button is-primary is-rounded mr-2 mt-2">
              <a href="https://github.com/paopow" style={{color: "inherit"}} target="_blank">
              <FontAwesomeIcon icon={['fab', 'github']} size="xs" />&nbsp;Github
              </a>
            </button>
            <button className="button is-primary is-rounded mr-2 mt-2">
              <a href="https://www.semanticscholar.org/author/Pao-Siangliulue/3061428" style={{color: "inherit"}} target="_blank">
              <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="twitter" className="svg-inline--fa fa-twitter fa-xs " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="m379.0868 75.20191c18.16812 40.68422 25.53302 83.89034 32.42143 127.20955-1.26557.35902-2.52865.72116-3.79427 1.08267-.9109-2.53364-1.98432-5.02156-2.70735-7.60959-5.21805-18.65384-10.47938-37.29655-15.47376-56.01156-1.79641-6.7327-6.03443-10.08392-12.09539-13.38137-8.90177-4.84112-17.31343-11.08316-24.69005-18.04576-4.70771-4.44068-8.73494-7.14859-15.41325-7.07815-44.46061.47028-88.92553.51538-133.38426.92448-2.96314.0295-6.63075 1.12345-8.72809 3.06448-8.08853 7.48476-15.67094 15.51457-25.64177 25.55586 26.29927 64.04074 39.52245 133.8403 33.84523 208.04469-12.62623-8.0842-22.40117-14.47949-22.98144-31.41848-2.90381-84.66094-29.02018-161.22472-83.580741-227.107617-1.227261-1.482494-1.837205-3.476039-2.736967-5.229823h284.960678zm-330.356845 32.64514c12.662672 0 25.33214-.20085 37.983708.17178 2.510789.0723 6.022658 1.66788 7.277148 3.67935 37.836649 60.79088 67.333839 124.63574 71.155359 197.68268.0178.28921-.2826.59448-1.36262 2.71657-22.61129-77.29358-63.40364-142.73587-115.871175-201.39106.273676-.95167.544426-1.90519.818185-2.85871zm-40.7293523 53.1819c18.0890173-.65752 33.3891773-1.3175 48.6911883-1.60238 1.541204-.0295 3.360468 2.009 4.650795 3.4439 29.847587 33.20131 56.935394 68.2806 73.632114 110.23473 3.17758 7.97976 5.35158 16.35996 7.98907 24.55477-34.58434-54.42464-82.710674-95.12245-134.9637713-136.63164zm194.4736173 275.76916c-31.48153-50.06559-61.80372-98.28894-92.12778-146.5123.37077-.47706.74155-.95165 1.11169-1.42811 2.54233 2.04731 56.62149 45.41225 80.9093 65.30201 6.76608 5.54129 11.87848 5.44178 18.91585-.27375 82.58396-67.08545 174.73706-117.86224 272.58287-158.80848 5.22305-2.18511 10.64009-3.91664 15.98238-5.81688 1.18651-.42022 2.44093-.65319 4.15147-.22122-113.62299 65.98672-222.02236 138.23835-301.52641 247.75933z" stroke-width=".086816" />
              </svg>
              &nbsp;Semantic Scholar
              </a>
            </button>
            <button className="button is-primary is-rounded mr-2 mt-2">
              <a href="https://scholar.google.com/citations?user=_ojsG2QAAAAJ&hl=en" style={{color: "inherit"}} target="_blank">
              <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="twitter" className="svg-inline--fa fa-twitter fa-xs " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                            <path d="m343.75868 106.66243v-27.232225l19.76497-15.430208h-213.89011l-129.157195 112.273603h85.656075c-.15534 2.12494-.21914 4.04644-.21914 6.22563 0 20.84472 7.2192 38.08662 21.67203 51.86089 14.45284 13.79702 32.25124 20.64784 53.32651 20.64784 4.92319 0 9.75059-.36794 14.43842-1.02419-2.90722 6.50082-4.37457 12.52302-4.37457 18.14228 0 9.87526 4.49924 20.4304 13.46715 31.6418-39.23377 2.6705-68.06112 9.73264-86.43702 21.16322-10.53108 6.49907-19.000207 14.70396-25.390349 24.5311-6.390569 9.89933-9.577754 20.51525-9.577754 31.9616 0 9.64822 2.062375 18.33611 6.21907 26.06233 4.156694 7.7263 9.577757 14.07047 16.312223 18.98408 6.71825 4.96781 14.46899 9.10088 23.219 12.46874 8.73429 3.34378 17.40643 5.71858 26.06106 7.06258 8.62707 1.34222 17.20471 1.9985 25.70579 1.9985 13.46887 0 26.95353-1.73428 40.54711-5.18707 13.56165-3.48461 26.28022-8.64143 38.17105-15.4927 11.85935-6.80488 21.51545-16.0865 28.9219-27.7183 7.39024-11.67998 11.09457-24.80499 11.09457-39.33613 0-11.01584-2.24964-21.03852-6.7502-30.14073-4.46864-9.07202-9.93785-16.54102-16.45271-22.34403-6.5008-5.81263-12.99987-11.15539-19.51512-15.9679-6.50083-4.84488-12.00021-9.75058-16.46884-14.8129-4.4848-5.04657-6.73444-10.05419-6.73444-14.98395 0-4.92145 1.73422-9.67183 5.21588-14.26559 3.45451-4.6095 7.67376-9.04795 12.60967-13.30571 4.93756-4.24944 9.87523-8.96788 14.79665-14.13302 4.92147-5.14719 9.14072-11.82739 12.60971-20.00822 3.48467-8.17907 5.20318-17.44489 5.20318-27.75679 0-13.4527-2.54714-24.46065-7.54735-33.31348-.59369-1.02243-1.21757-1.80338-1.87511-3.02225l56.90745-46.672136v17.118526c-7.39373.92969-6.62422 5.34582-6.62422 10.6352v128.66719c0 5.95832 4.8751 10.83382 10.83386 10.83382h3.98869c5.95835 0 10.83386-4.87506 10.83386-10.83382v-128.66719c0-5.27669.77741-9.68801-6.56167-10.63039zm-107.36003 222.47871c1.14099.7503 3.7039 2.78075 7.7184 6.03838 4.0495 3.24319 6.797 5.69582 8.26567 7.41432 1.43851 1.66381 3.5792 4.16501 6.37617 7.54734 2.81268 3.3744 4.7184 6.30394 5.71853 8.73425 1.00016 2.4767 2.01603 5.46089 3.04636 8.94556.98567 3.44488 1.48486 6.97595 1.48486 10.56169 0 17.04813-6.56338 29.68007-19.65604 37.85915-13.125 8.18083-28.76651 12.27368-46.93767 12.27368-9.18709 0-18.2031-1.09289-27.06247-3.1951-8.84322-2.11665-17.31192-5.3362-25.39035-9.60185-8.07846-4.25771-14.57754-10.20337-19.50072-17.79659-4.93764-7.64012-7.40645-16.41464-7.40645-26.24962 0-10.32022 2.79692-19.28987 8.42233-26.90588 5.59343-7.62564 12.93774-13.3919 22.03208-17.3154 9.0624-3.94582 18.24946-6.74232 27.56166-8.39827 9.31221-1.7023 18.79679-2.555 28.43842-2.555 4.46862 0 7.93582.25115 10.40465.69607.45456.21918 3.03188 2.07025 7.73456 5.56326 4.70401 3.46237 7.62565 5.59519 8.75047 6.38401zm-3.35823-100.5779c-7.40648 8.85938-17.73454 13.2882-30.95363 13.2882-11.85933 0-22.29766-4.76482-31.26554-14.31195-8.99984-9.52309-15.42235-20.32803-19.34408-32.43061-3.93752-12.10871-5.90585-23.98423-5.90585-35.648 0-13.6942 3.59542-25.35184 10.7809-34.97598 7.18727-9.64952 17.49915-14.48477 30.93786-14.48477 11.87507 0 22.37423 5.03825 31.43704 15.15677 9.09434 10.08482 15.60961 21.41303 19.5169 33.96799 3.92176 12.5392 5.87345 24.52979 5.87345 35.98399 0 13.44658-3.70256 24.60984-11.07663 33.45436z" stroke-width=".064787"/>
              </svg>
              &nbsp;Google Scholar
              </a>
            </button>
            <button className="button is-primary is-rounded mr-2 mt-2">
              <a href="https://www.instagram.com/siangliulue/" style={{color: "inherit"}} target="_blank">
              <FontAwesomeIcon icon={['fab', 'instagram']} size="xs" />&nbsp;Instagram
              </a>
            </button>
          </div>
        </div>

      </div>

    </div>
  </section>
  </>
  );
}


// My research focus on developing information systems to support users and crowdworkers to explore and make sense of large amounts of information and make better decisions. For example, using crowds to synthesize search results into coherent articles or empowering consumers to navigate and explore thousands of reviews and online sources and gain deep insights and make confident decisions.