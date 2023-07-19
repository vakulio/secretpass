import {
  Component,
  ContentChildren,
  AfterContentInit,
  QueryList,
  inject,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { TabComponent } from '../tab/tab.component';
import { NgClass, NgFor } from '@angular/common';

@Component({
  selector: 'secretpass-tabs-container',
  templateUrl: './tabs-container.component.html',
  styles: [],
  standalone: true,
  imports: [NgClass, NgFor],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsContainerComponent implements AfterContentInit {
  cd = inject(ChangeDetectorRef);
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent> =
    new QueryList();

  ngAfterContentInit(): void {
    const activeTabs = this.tabs.filter((tab) => tab.active);

    if (!activeTabs || activeTabs.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }

  selectTab(tab: TabComponent) {
    this.tabs.forEach((tab) => (tab.active = false));
    tab.active = true;
    return false;
  }
}
