import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* mainLaout Component */
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SideNavComponent} from './side-nav/side-nav.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [FooterComponent, HeaderComponent, SideNavComponent],
  /* 
    exports 하는 이유는 해당 컴포넌트는 해당 모듈에서만 사용이 가능하기 때문이다
    이 모듈은 AppModule에 import해야 하는데 exports 하지 않으면 AppModule에서
    아래의 component를 참조할 수 없기 때문에 exports를 꼭 해줘야 한다.
  */
  exports: [FooterComponent, HeaderComponent, SideNavComponent]
})
export class MisLayoutModule { }
