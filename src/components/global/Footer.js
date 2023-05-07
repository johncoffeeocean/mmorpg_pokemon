import React from "react";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer_wrap">
        <div className="footer_sns sns_links">
          <a href="#" target="_blank" className="sns_btn sns_btn--discord">
            <i className="ico_comm ico_discord"></i>
            <span className="ir_pm">discord</span>
          </a>
          <a href="#" target="_blank" className="sns_btn sns_btn--youtube">
            <i className="ico_comm ico_youtube"></i>
            <span className="ir_pm">youtube</span>
          </a>
          <a href="# " target="_blank" className="sns_btn sns_btn--facebook">
            <i className="ico_comm ico_facebook"></i>
            <span className="ir_pm">facebook</span>
          </a>
          <a href="#" target="_blank" className="sns_btn sns_btn--facebook">
            <i className="ico_comm ico_instagram"></i>
            <span className="ir_pm">instagram</span>
          </a>
          <a href="#" target="_blank" className="sns_btn sns_btn--twitter">
            <i className="ico_comm ico_twitter"></i>
            <span className="ir_pm">twitter</span>
          </a>
          <a href="#" target="_blank" className="sns_btn sns_btn--reddit">
            <i className="ico_comm ico_reddit"></i>
            <span className="ir_pm">reddit</span>
          </a>
        </div>

        <div className="footer_terms">
          <a href="#n" className="link">
            Service footer_termss
          </a>
          <a href="#" className="link">
            Privacy Policy
          </a>
          <a href="#" className="link">
            Policies
          </a>

          <a href="#" className="link" target="_blank">
            Customer support
          </a>
        </div>

        <div className="footer_copyright">
          <p>This is footer section of MMORPG & Pokemon Game </p>
          <p>Copyright © 2023 HyperionDev. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
